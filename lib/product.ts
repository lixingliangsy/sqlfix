export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "SQLFix",
  slug: "sqlfix",
  tagline: "Plain-English to SQL, explained",
  description: "Turn a question into a correct SQL query with a plain-English explanation \u2014 for analysts and founders who would rather not hand-write JOINs.",
  toolTitle: "Describe what you need",
  resultLabel: "Your SQL",
  ctaLabel: "Generate SQL",
  features: [
  "Natural language to SQL",
  "Plain-English explanation",
  "Handles JOINs, GROUP BY, CTEs",
  "Dialect-aware (Postgres / MySQL / SQLite / BigQuery)"
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
  systemPrompt: "You are a senior SQL engineer. Given a table schema (if any) and a plain-English question, write a correct, readable SQL query in the requested dialect, then explain it in 2-3 plain sentences. Prefer CTEs for clarity. Output the SQL in a fenced block followed by the explanation.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 queries/day"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, explain mode, save history"
  },
  {
    "tier": "Team",
    "price": "$49/mo",
    "desc": "Shared workspace, export"
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
-- (Mock output. Add OPENAI_API_KEY for a query from your real question.)`
}
}
