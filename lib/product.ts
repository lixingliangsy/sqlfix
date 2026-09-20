export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "SQLFix",
  slug: "sqlfix",
  productId: "PROD_73SrHhzlHullVM1WIs1zwp",
  priceMonthly: 19,
  yearlyProductId: "PROD_6AUOVCx5TEh0Q8EyZGanzj",
  priceYearly: 190,

  checkoutUrl: "/api/checkout",
  pipelineId: "sql-fix-v1",
  rulesetId: "sql-safety@2026-07-19.3",
  rulesetVersion: "sql-safety@2026-07-19.3",
  tagline: "Natural-language to SQL — screened for the dangerous stuff",
  description: "SQLFix turns a plain-English question into a correct, dialect-aware SQL query with a plain explanation. Every generated query is screened by a deterministic safety ruleset (injection, DROP without WHERE, dangerous UPDATE/DELETE, syntax) before you copy it.",
  toolTitle: "Describe what you need",
  resultLabel: "Your SQL",
  ctaLabel: "Generate SQL",
  definitionLead: "SQLForm turns natural-language questions into read-oriented SQL drafts with deterministic safety checks (e.g. destructive statements) — decision-support for analysts, not auto-exec.",
  geoFaq: [
    { q: "Does it execute SQL on my database?", a: "No. It drafts SQL text for you to review. Execution stays in your tools." },
    { q: "How does it reduce risk?", a: "Rule checks flag destructive patterns (DROP/DELETE without WHERE, etc.) before you run anything." },
    { q: "Which dialects?", a: "Drafts are generally ANSI-leaning; adjust identifiers for your warehouse dialect." },
    { q: "Is Demo mode live AI?", a: "Demo is labelled and does not require a live key." },
    { q: "Who is it for?", a: "Analysts and PMs who want a first-pass SELECT with safety annotations." },
    { q: "Primary guidance?", a: "Treat SQL as untrusted until reviewed; follow your org's data-access policy." },
  ],
  features: [
    "Natural language to SQL (Postgres/MySQL/SQLite/BigQuery)",
    "Plain-English explanation of every query",
    "Deterministic safety ruleset (sql-safety@2026-07-19)",
    "Flags injection / DROP-no-WHERE / dangerous UPDATE",
    "Exportable query report with runId",
    "Workflow runs — not bare AI credits"
  ],
  inputs: [
  {
    "key": "schema",
    "label": "Table / schema (optional)",
    "type": "textarea",
    "placeholder": "e.g. users(id, name, created_at); orders(id, user_id, total, status)"
  },
  {
    "key": "question",
    "label": "What do you want to know?",
    "type": "textarea",
    "placeholder": "e.g. total revenue per user who placed more than 3 paid orders in 2025"
  },
  {
    "key": "dialect",
    "label": "Dialect",
    "type": "select",
    "options": [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "BigQuery"
    ]
  }
] as InputField[],
  systemPrompt: "You are a senior SQL engineer. Given a table schema (if any) and a plain-English question, write a correct, readable SQL query in the requested dialect, then explain it in 2-3 plain sentences. Prefer CTEs for clarity. Output the SQL in a fenced block followed by the explanation. NEVER build SQL by string-concatenating user input — use parameterized placeholders. Respect the deterministic safety findings provided and do not emit injection-prone or destructive patterns. In demo (mock) mode, return a realistic sample query and explanation following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 workflow runs / day · watermarked export"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "300 workflow runs / mo · audit log · JSON/CSV export"
  },
  {
    "tier": "Enterprise",
    "price": "Custom",
    "desc": "SSO-ready · BYOK · higher caps · shared rulesets"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const q = inputs['question'] || 'your question'
  const d = inputs['dialect'] || 'PostgreSQL'
  const s = inputs['schema'] || 'your tables'
  return `-- Dialect: ${d}
-- Schema: ${s}

SELECT u.name, SUM(o.total) AS revenue
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid' AND o.created_at >= '2025-01-01'
GROUP BY u.name
HAVING COUNT(o.id) > 3
ORDER BY revenue DESC;

-- Explanation: joins users and orders, keeps paid 2025 orders, groups by user,
-- keeps only those with >3 orders, ranks by revenue.
-- Safety: parameterized filters, has WHERE, no DROP/DELETE. (Demo. Add OPENAI_API_KEY for a query from your real question.)`
}
}
