export type DemoLineKind = "sys" | "agent" | "gate" | "done";
export type DemoLine = [DemoLineKind, string];

// Ported verbatim from js/main.js — the exact copy the interactive demo
// has always shown, unchanged by the migration.
export const SCENARIOS: Record<"support" | "finance" | "sales", DemoLine[]> = {
  support: [
    ["sys", "New ticket #4821 — “Order arrived damaged, need replacement before Friday.”"],
    ["agent", "Reading order history… <b>repeat customer, 14 orders, high value.</b>"],
    ["agent", "Checking inventory — replacement in stock at nearest warehouse."],
    ["agent", "Drafted reply + expedited replacement order, <b>no charge.</b>"],
    ["gate", "Refund-or-replace above ₹4,000 → routed for one-click human approval."],
    ["done", "Resolved in 3m 41s · full action log saved · CSAT survey queued ✓"],
  ],
  finance: [
    ["sys", "Invoice INV-2207 received from vendor (PDF, 3 pages, 41 line items)."],
    ["agent", "Extracted all fields · matched against <b>PO-1188</b> and goods receipt."],
    ["agent", "39/41 items matched. 2 discrepancies found — price variance on line 12, 18."],
    ["agent", "Drafted discrepancy email to vendor with exact line references."],
    ["gate", "Payment run updated → held for controller sign-off, evidence attached."],
    ["done", "Processed in 1m 58s · zero manual data entry · audit trail complete ✓"],
  ],
  sales: [
    ["sys", "New lead: operations director, mid-size logistics company, webinar signup."],
    ["agent", "Researched company — 240 staff, 3 warehouses, hiring for manual data roles."],
    ["agent", "Scored <b>87/100</b> against your ICP · enriched CRM record with 14 fields."],
    ["agent", "Drafted personalised outreach referencing their warehouse expansion."],
    ["gate", "Outreach email → queued in your rep’s drafts for review, never auto-sent."],
    ["done", "Lead researched, scored & prepped in 2m 12s · rep starts warm ✓"],
  ],
};
