import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "overview",
    title: "What SQLFix does",
    keywords: ["sqlfix", "nl2sql"],
    body:
      "SQLFix is a safety-first natural-language-to-SQL (NL2SQL) tool. Describe what you need in plain English and it writes the correct query for PostgreSQL, MySQL, SQLite or BigQuery, with a plain-language explanation. Every statement is then checked by a deterministic safety rule set that flags SQL injection, DROP/DELETE without a WHERE clause and dangerous UPDATE statements.",
    source: "Product documentation / website",
    tags: [],
  },
  {
    id: "dialects",
    title: "Supported database dialects",
    keywords: ["postgres", "mysql", "sqlite", "bigquery", "dialect", ],
    body:
      "SQLFix supports four mainstream dialects: PostgreSQL, MySQL, SQLite and BigQuery. Pick one from the Dialect dropdown in the tool. Syntax differences between dialects are handled automatically when the query is generated.",
    source: "Product documentation / features",
    tags: [],
  },
  {
    id: "how-it-works",
    title: "How SQLFix works",
    keywords: ["how"],
    body:
      "Three steps: (1) optionally paste your table schema (for example users(id, name, created_at)) so the query matches your real tables; (2) describe the requirement in plain language (for example total spend per paying user in 2025); (3) choose the dialect and click Generate SQL. You get the SQL, an explanation and the safety-check result.",
    source: "Product documentation / getting started",
    tags: [],
  },
  {
    id: "sql-safety-rules",
    title: "The SQL safety rule set",
    keywords: ["DROP", "DELETE", "UPDATE"],
    body:
      "SQLFix checks every generated statement against a deterministic rule set (sql-safety@2026-07-19.3): (1) SQL injection patterns such as UNION SELECT or OR 1=1; (2) DROP/DELETE without a WHERE clause; (3) dangerous UPDATE statements without a WHERE clause; (4) syntax validity. The findings are annotated on the output.",
    source: "Product documentation / security",
    tags: ["compliance"],
  },
  {
    id: "pricing",
    title: "SQLFix pricing: Free / Pro / Enterprise",
    keywords: ["pro", "enterprise", "plan"],
    body:
      "Three tiers: Free ($0, 5 runs per day, watermarked export); Pro ($19/month or $190/year, 300 runs per month, audit log, JSON/CSV export, no watermark); Enterprise (custom, SSO / BYOK / higher quota / shared rule sets).",
    source: "Pricing page",
    tags: [],
  },
  {
    id: "billing",
    title: "Billing and subscription management",
    keywords: ["billing", "subscription"],
    body:
      "Subscriptions are handled by Waffo. You can review usage and manage the subscription on the Settings page. For a refund or a billing question, send it from the feedback page or ask for a human and we will respond within 1-2 business days.",
    source: "Product documentation / billing",
    tags: [],
  },
  {
    id: "ai-support-scope",
    title: "What the AI assistant can and cannot do",
    keywords: [],
    body:
      "I am the AI support assistant for SQLFix. I answer common questions about NL2SQL, supported dialects, the safety rules, pricing, accounts and how to use the tool, and I hand off to a human when needed. I cannot change your account, process a refund or access payment credentials; for database architecture questions please consult a professional DBA.",
    source: "Product documentation / AI support",
    tags: [],
  },
  {
    id: "account-login",
    title: "Sign-in and account questions",
    keywords: ["account"],
    body:
      "Accounts sign in with an email address. To reset a password or if you cannot sign in, use the Contact us / talk to a human entry point and the team will verify your identity first. For security reasons we never ask for or reset a password inside the chat.",
    source: "Product documentation / account",
    tags: [],
  },
  {
    id: "byok",
    title: "BYOK - bring your own API key",
    keywords: ["byok", "api key", "bring your own", "key"],
    body:
      "Enterprise and above support BYOK (Bring Your Own Key), so you can run the model on your own API key. It is configured on the Settings page. Pro users draw on the shared platform quota.",
    source: "Product documentation / integrations",
    tags: [],
  },
  {
    id: "audit-log",
    title: "Audit log and export",
    keywords: ["audit", "log", "export", ],
    body:
      "Every generated query is recorded in an audit log (runId, timestamp, input, output, safety-check result). Pro and above can export the audit report as JSON or CSV for team review and compliance retention.",
    source: "Product documentation / features",
    tags: [],
  },
  {
    id: "compliance-disclaimer",
    title: "Disclaimer for compliance answers",
    keywords: ["disclaimer"],
    body:
      "On database safety and compliance topics, SQLFix provides safety checks at the SQL level and an information summary. That is not database-architecture, DBA or compliance-certification advice. For a formal decision, combine it with your own context and a qualified professional.",
    source: "Product documentation / disclaimer",
    tags: ["compliance"],
  },
  {
    id: "contact-human",
    title: "Contact us / talk to a human",
    keywords: [],
    body:
      "For human help (account issues, refunds, partnerships, enterprise purchasing or technical questions) just say talk to a human and leave your email, or send the details from the feedback page (/feedback). Our team replies within 1-2 business days.",
    source: "Product documentation / support",
    tags: [],
  },
  {
    id: "schema-input",
    title: "How to provide your table schema",
    keywords: ["schema", "table", "column"],
    body:
      "In the Table / schema box, describe your tables in a compact form, for example: users(id, name, email, created_at); orders(id, user_id, total, status). This lets SQLFix generate queries that are accurate and specific to your actual database.",
    source: "Product documentation / usage tips",
    tags: [],
  },
  {
    id: "safety-report",
    title: "Reading the safety-check report",
    keywords: ["report", "flag", "warning"],
    body:
      "The report covers: (1) whether an injection pattern was detected; (2) whether a DROP/DELETE has no WHERE clause; (3) whether an UPDATE has no WHERE clause; (4) syntax validity. Anything marked with a warning needs human review before you run it.",
    source: "Product documentation / security",
    tags: ["compliance"],
  },
  {
    id: "use-cases",
    title: "Typical use cases for SQLFix",
    keywords: ["use case", ],
    body:
      "Typical uses: (1) an analyst generating report SQL quickly; (2) a founder or developer who does not know SQL syntax well; (3) generating queries during a database migration; (4) a teaching aid for learning SQL; (5) day-to-day operational data pulls.",
    source: "Product documentation / use cases",
    tags: [],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
