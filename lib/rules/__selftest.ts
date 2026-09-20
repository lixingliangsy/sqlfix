// lib/rules/__selftest.ts — deterministic self-test for SQLFix safety rules.
// Run: tsx lib/rules/__selftest.ts
import { runDeterministicChecks, RULESET_VERSION, SQL_RULES } from './sql-safety'

let passed = 0
let failed = 0
function assert(name: string, cond: boolean) {
  if (cond) {
    passed++
    console.log('  ok  -', name)
  } else {
    failed++
    console.error('  FAIL -', name)
  }
}

// 1. ruleset carries version + populated rule set
assert('RULESET_VERSION present', typeof RULESET_VERSION === 'string' && RULESET_VERSION.length > 0)
assert('SQL_RULES populated', Array.isArray(SQL_RULES) && SQL_RULES.length >= 5)

// 2. string-concatenation injection is flagged
const inj = runDeterministicChecks("SELECT * FROM users WHERE name = '" + " + userInput + '")
assert('SF-01 flags string concatenation', inj.hits.some((h) => h.id === 'SF-01'))

// 3. UPDATE without WHERE flagged
const upd = runDeterministicChecks('UPDATE users SET active = 0')
assert('SF-03 flags UPDATE without WHERE', upd.hits.some((h) => h.id === 'SF-03'))

// 4. SELECT * flagged
const star = runDeterministicChecks('SELECT * FROM orders')
assert('SF-05 flags SELECT *', star.hits.some((h) => h.id === 'SF-05'))

// 5. tautology injection probe flagged
const taut = runDeterministicChecks("SELECT * FROM t WHERE id = 1 OR '1'='1'")
assert('SF-07 flags tautology', taut.hits.some((h) => h.id === 'SF-07'))

// 6. stacked statement flagged
const stacked = runDeterministicChecks('SELECT 1; DROP TABLE users')
assert('SF-08 flags stacked statement', stacked.hits.some((h) => h.id === 'SF-08'))

// 7. clean parameterized query produces no hits
const clean = runDeterministicChecks('SELECT id, name FROM users WHERE id = $1 AND active = $2')
assert('clean parameterized query produces no hits', clean.hits.length === 0)

// 8. each hit carries remediation
assert('hits carry remediation', inj.hits.every((h) => typeof h.remediation === 'string' && h.remediation.length > 0))

console.log(`\nsqlfix rules selftest: ${passed} passed, ${failed} failed`)
try {
  const fs = require('fs')
  fs.mkdirSync('.data', { recursive: true })
  try { fs.writeFileSync('.data/selftest-result.json', JSON.stringify({ passed, failed, ok: failed === 0, product: 'sqlfix' })) } catch (e) { /* read-only FS (serverless): best effort */ }
} catch {}
if (failed > 0) process.exit(1)
