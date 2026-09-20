/**
 * SQLFix vertical ruleset — deterministic SQL safety checks.
 * Runs AFTER the model generates SQL, so every emitted query is screened for
 * injection, destructive, and risky patterns before it reaches the user.
 */
export const RULESET_VERSION = 'sql-safety@2026-07-19.3'

export type SqlRule = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  check: (ctx: { sql: string }) => boolean
  remediation: string
}

function hasWhere(sql: string): boolean {
  return /\bwhere\b/i.test(sql)
}

export const SQL_RULES: SqlRule[] = [
  {
    id: 'SF-01',
    title: 'Possible SQL injection — string concatenation instead of parameters',
    severity: 'high',
    check: ({ sql }) => /'\s*\+\s*|\+\s*'\s*\+|\|\|\s*\$?[a-z_]+|'\s*\+\s*req|'\s*\+\s*input|'\s*\+\s*params/i.test(sql),
    remediation:
      'Never interpolate user input into SQL with quotes/concatenation. Use prepared statements / parameterized queries (? / $1 / @p) so the driver treats input as data, not code (OWASP SQL Injection Prevention Cheat Sheet — Defense Option 1).',
  },
  {
    id: 'SF-02',
    title: 'DROP without a WHERE clause (or DROP DATABASE)',
    severity: 'high',
    check: ({ sql }) => /\bdrop\s+(table|database|schema)\b/i.test(sql) && !/drop\s+table\s+if\s+exists\s+\w+\s+where/i.test(sql),
    remediation:
      'A DROP should be intentional and scoped. Prefer `DROP TABLE IF EXISTS <name>` and never run DROP against production without a reviewed migration and backup.',
  },
  {
    id: 'SF-03',
    title: 'UPDATE / DELETE without a WHERE clause (full-table write)',
    severity: 'high',
    check: ({ sql }) => {
      const t = sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
      const updDel = t.match(/\b(update|delete)\b[\s\S]*?\b(from|set)\b/i)
      if (!updDel) return false
      return !hasWhere(t)
    },
    remediation:
      'Always add a WHERE clause (or a LIMIT) to UPDATE/DELETE, or you will rewrite/delete every row. In a transaction with a SELECT first to preview affected rows.',
  },
  {
    id: 'SF-04',
    title: 'Destructive DDL in a read/report context (TRUNCATE, ALTER, DROP)',
    severity: 'medium',
    check: ({ sql }) => /\b(truncate|alter\s+table|drop\s+column|rename\s+table)\b/i.test(sql),
    remediation:
      'This looks like a read/report query but contains destructive DDL. Confirm this is intended and run it through a migration review, not ad-hoc.',
  },
  {
    id: 'SF-05',
    title: 'SELECT * over-fetch (non-sargable / returns unused columns)',
    severity: 'low',
    check: ({ sql }) => /\bselect\s+\*/i.test(sql),
    remediation:
      'Select only the columns you need. `SELECT *` wastes bandwidth, breaks when schemas change, and prevents covering indexes. List explicit columns.',
  },
  {
    id: 'SF-06',
    title: 'Unbalanced parentheses (likely syntax error)',
    severity: 'medium',
    check: ({ sql }) => {
      let depth = 0
      for (const ch of sql) {
        if (ch === '(') depth++
        else if (ch === ')') depth--
        if (depth < 0) return true
      }
      return depth !== 0
    },
    remediation:
      'Every opening parenthesis needs a matching close. Count subqueries/CTEs — a missing `)` is the most common SQL syntax error.',
  },
  {
    id: 'SF-07',
    title: 'Tautology / OR-injection pattern ("1"="1")',
    severity: 'medium',
    check: ({ sql }) => /'\s*1'\s*=\s*'1'|"\s*1"\s*=\s*"1"|or\s+1\s*=\s*1/i.test(sql),
    remediation:
      "A `OR '1'='1'` style tautology is a classic injection probe. If you see it, the query was likely built from untrusted input — parameterize it instead (OWASP).",
  },
  {
    id: 'SF-08',
    title: 'Stacked / multi-statement query (common injection vector)',
    severity: 'high',
    check: ({ sql }) => {
      const t = sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim()
      // More than one statement separator outside strings (heuristic)
      const parts = t.split(';').map((p) => p.trim()).filter(Boolean)
      return parts.length > 1
    },
    remediation:
      'Prefer a single statement per call. Disable multi-statement execution on the driver when possible; stacked queries are a frequent SQLi technique.',
  },
  {
    id: 'SF-09',
    title: 'Dangerous server-side function / file IO pattern',
    severity: 'high',
    check: ({ sql }) =>
      /\b(xp_cmdshell|sp_executesql|load_file\s*\(|into\s+outfile|into\s+dumpfile|pg_read_file|copy\s+\w+\s+from\s+program)\b/i.test(
        sql,
      ),
    remediation:
      'Remove OS/file IO helpers from application SQL paths. These APIs enable RCE or data exfiltration if attacker-controlled (pair with least-privilege DB roles).',
  },
]

export function runDeterministicChecks(sql: string) {
  const safe = String(sql || '')
  const hits = SQL_RULES.filter((r) => r.check({ sql: safe })).map((r) => ({
    id: r.id,
    title: r.title,
    severity: r.severity,
    remediation: r.remediation,
    source: 'Rule-based' as const,
  }))
  return { rulesetVersion: RULESET_VERSION, hits }
}
