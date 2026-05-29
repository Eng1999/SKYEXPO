import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Simple in-memory rate limit: max 3 submissions per IP per 10 min ── */
const rateMap = new Map<string, { count: number; reset: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.reset < now) {
    rateMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildNotificationEmail(name: string, email: string, phone: string, message: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr>
    <td style="background:linear-gradient(135deg,#1a0a08 0%,#0a0a0f 100%);border-radius:12px 12px 0 0;padding:32px 36px;border-bottom:2px solid #C0392B;">
      <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#C0392B;">SKY EXPO</p>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">رسالة جديدة من الموقع</h1>
    </td>
  </tr>
  <tr>
    <td style="background:#111114;padding:36px;border-radius:0 0 12px 12px;border:1px solid rgba(255,255,255,0.06);border-top:0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:0 0 20px 0;">
          <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.35);">الاسم</p>
          <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">${esc(name)}</p>
        </td></tr>
        <tr><td style="padding:0 0 20px 0;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:12px 0 6px 0;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.35);">البريد الإلكتروني</p>
          <a href="mailto:${esc(email)}" style="font-size:15px;color:#C0392B;text-decoration:none;">${esc(email)}</a>
        </td></tr>
        ${phone ? `<tr><td style="padding:0 0 20px 0;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:12px 0 6px 0;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.35);">الهاتف</p>
          <a href="tel:${esc(phone)}" style="font-size:15px;color:#ffffff;text-decoration:none;">${esc(phone)}</a>
        </td></tr>` : ""}
        <tr><td style="padding:0;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:12px 0 10px 0;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.35);">الرسالة</p>
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.85);line-height:1.8;white-space:pre-wrap;">${esc(message)}</p>
          </div>
        </td></tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
        <tr><td align="center">
          <a href="mailto:${esc(email)}?subject=${encodeURIComponent("رد على رسالتك — SKY EXPO")}"
             style="display:inline-block;padding:14px 36px;background:#C0392B;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;letter-spacing:0.05em;">
            الرد على الرسالة
          </a>
        </td></tr>
      </table>
      <p style="margin:28px 0 0 0;text-align:center;font-size:11px;color:rgba(255,255,255,0.2);">
        SKY EXPO Event Solutions &nbsp;·&nbsp; skyexpo.com.sa
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function buildConfirmationEmail(name: string, isAr: boolean) {
  const visit = isAr ? "زيارة الموقع" : "Visit Website";
  const title = isAr ? `شكراً لتواصلك، <span style="color:#C0392B;">${esc(name)}</span>` : `Thank you, <span style="color:#C0392B;">${esc(name)}</span>`;
  const body1 = isAr
    ? "تلقّينا رسالتك وسيتواصل معك فريقنا في أقرب وقت ممكن."
    : "We received your message and our team will get back to you as soon as possible.";
  const body2 = isAr
    ? "للتواصل الفوري:"
    : "Need to reach us immediately?";
  const dir = isAr ? "rtl" : "ltr";

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${isAr ? "ar" : "en"}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr>
    <td style="background:linear-gradient(135deg,#1a0a08 0%,#0a0a0f 100%);border-radius:12px 12px 0 0;padding:48px 36px;text-align:center;border-bottom:2px solid #C0392B;">
      <p style="margin:0 0 16px 0;font-size:11px;letter-spacing:0.5em;text-transform:uppercase;color:#C0392B;">SKY EXPO</p>
      <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.4;">${title}</h1>
    </td>
  </tr>
  <tr>
    <td style="background:#111114;padding:40px 36px;border-radius:0 0 12px 12px;border:1px solid rgba(255,255,255,0.06);border-top:0;text-align:center;">
      <p style="margin:0 0 20px 0;font-size:15px;color:rgba(255,255,255,0.75);line-height:1.9;">${body1}</p>
      <div style="width:60px;height:1px;background:rgba(192,57,43,0.4);margin:24px auto;"></div>
      <p style="margin:0 0 8px 0;font-size:13px;color:rgba(255,255,255,0.4);">${body2}</p>
      <p style="margin:0 0 32px 0;font-size:13px;">
        <a href="mailto:info@skyexpo.com.sa" style="color:#C0392B;text-decoration:none;">info@skyexpo.com.sa</a>
        &nbsp;·&nbsp;
        <a href="tel:+966558193104" style="color:rgba(255,255,255,0.5);text-decoration:none;">+966 558 193 104</a>
      </p>
      <a href="https://skyexpo.com.sa"
         style="display:inline-block;padding:14px 36px;border:1px solid rgba(255,255,255,0.15);color:#ffffff;text-decoration:none;border-radius:6px;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;">
        ${visit}
      </a>
      <p style="margin:36px 0 0 0;font-size:11px;color:rgba(255,255,255,0.2);">
        SKY EXPO Event Solutions &nbsp;·&nbsp; skyexpo.com.sa
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    /* ── Rate limiting ── */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    if (!checkRate(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, message, _hp, lang } = body;

    /* ── Honeypot spam check — bots fill hidden fields ── */
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    /* ── Validation ── */
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (name.length > 120 || email.length > 200 || message.length > 3000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const isAr = lang === "ar";

    /* ── Send both emails in parallel ── */
    const [notif, confirm] = await Promise.allSettled([
      resend.emails.send({
        from:    "SKY EXPO Website <onboarding@resend.dev>",
        to:      ["info@skyexpo.com.sa"],
        replyTo: email.trim(),
        subject: `رسالة جديدة من الموقع — ${name.trim()}`,
        html:    buildNotificationEmail(name.trim(), email.trim(), phone?.trim() ?? "", message.trim()),
      }),
      resend.emails.send({
        from:    "SKY EXPO <onboarding@resend.dev>",
        to:      [email.trim()],
        subject: isAr ? "شكراً لتواصلك — SKY EXPO" : "Thank you for reaching out — SKY EXPO",
        html:    buildConfirmationEmail(name.trim(), isAr),
      }),
    ]);

    if (notif.status === "rejected" || (notif.status === "fulfilled" && notif.value.error)) {
      const errMsg =
        notif.status === "rejected"
          ? (notif.reason as Error).message
          : notif.value.error?.message ?? "Unknown";
      console.error("[Resend Notification Error]", errMsg);
      return NextResponse.json({ error: "Failed to send", detail: errMsg }, { status: 500 });
    }

    if (confirm.status === "rejected") {
      console.warn("[Resend Confirmation Warning]", (confirm.reason as Error).message);
    } else if (confirm.status === "fulfilled" && confirm.value.error) {
      console.warn("[Resend Confirmation Warning]", confirm.value.error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const e = err as Error;
    console.error("[Contact API Error]", e.message);
    return NextResponse.json({ error: "Failed to send", detail: e.message }, { status: 500 });
  }
}
