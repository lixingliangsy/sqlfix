import fs from 'fs'
import path from 'path'

export function audit(event: string, meta: Record<string, unknown> = {}) {
  const dir = path.join(process.cwd(), '.data', 'audit')
  try { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) } catch (e) { /* read-only FS (serverless): best effort */ }
  const line = { ts: new Date().toISOString(), event, ...meta }
  try { fs.appendFileSync(path.join(dir, 'audit.jsonl'), JSON.stringify(line) + '\n', 'utf8') } catch (e) { /* read-only FS (serverless): best effort */ }
}

/** Append an audit entry keyed by product slug (used by pages/api/tool.ts). */
export function appendAudit(slug: string, meta: Record<string, unknown> = {}) {
  const event = String(meta.event || 'event')
  audit(event, { product: slug, ...meta })
}
