/**
 * pages/api/feedback.ts —— 用户反馈提交端点
 *
 * 支持两种格式：
 * 1. 产品反馈（FeedbackForm 组件）：category/body/email/attachment
 * 2. 工具运行反馈（thumbs up/down）：runId/thumbs/correction
 */

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { submitFeedback, dispatchEmail, validCategory } from "../../lib/feedback";
import { SUPPORT } from "../../lib/support.config";

const SLUG = "sqlfix";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  const body = (req.body || {}) as any;

  if (body.category && body.body) {
    return handleProductFeedback(body, res);
  }

  return handleRunFeedback(body, res);
}

async function handleProductFeedback(body: any, res: NextApiResponse) {
  try {
    const fb = submitFeedback({
      category: String(body.category),
      body: String(body.body),
      email: body.email ? String(body.email) : undefined,
      attachment: body.attachment,
    });

    void dispatchEmail(fb, {
      to: SUPPORT.feedbackEmail,
      subjectPrefix: `[${SUPPORT.productName} feedback]`,
    }).catch(() => {});

    return res.status(200).json({ ok: true, id: fb.id });
  } catch (e: any) {
    if (e.message === "BODY_TOO_SHORT") {
      return res.status(400).json({ error: "Feedback must be at least 5 characters", code: "BODY_TOO_SHORT" });
    }
    if (e.message === "BODY_TOO_LONG") {
      return res.status(400).json({ error: "Feedback must not exceed 5000 characters", code: "BODY_TOO_LONG" });
    }
    console.error("[feedback] submit failed:", e?.message);
    return res.status(500).json({ error: "Submission failed", code: "SUBMIT_ERROR" });
  }
}

function handleRunFeedback(body: any, res: NextApiResponse) {
  const dir = path.join(process.cwd(), '.data', 'feedback')
  try { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) } catch (e) { /* read-only FS (serverless): best effort */ }
  const row = {
    ts: new Date().toISOString(),
    runId: String(body.runId || ''),
    thumbs: body.thumbs || null,
    correction: String(body.correction || '').slice(0, 2000),
  }
  try { fs.appendFileSync(path.join(dir, `${SLUG}.jsonl`), JSON.stringify(row) + '\n', 'utf8') } catch (e) { /* read-only FS (serverless): best effort */ }
  return res.status(200).json({ ok: true })
}