import { KB } from "./agent/kb";
import type { SupportConfig } from "./support-kit/types";

export const SUPPORT: SupportConfig = {
  productSlug: "sqlfix",
  productName: "SQLFix",
  feedbackEmail: process.env.FEEDBACK_TO_EMAIL || "lixingliangsy@163.com",
  kb: KB,
  chatHost: process.env.APP_URL || "https://sqlfix.lxsaihub.com",
  brandColor: "#2563EB",
  complianceDisclaimer: "This assistant provides SQL-safety assistance only; it is not database-architecture or compliance-certification advice.",
};
