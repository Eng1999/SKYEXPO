import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from:    "SKY EXPO Website <onboarding@resend.dev>",
      to:      ["info@skyexpo.com.sa"],
      replyTo: email,
      subject: `رسالة جديدة من الموقع — ${name}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0f;color:#fff;border-radius:8px;">
          <div style="border-bottom:2px solid #C0392B;padding-bottom:16px;margin-bottom:24px;">
            <h2 style="margin:0;color:#fff;font-size:20px;">📩 رسالة جديدة من الموقع الإلكتروني</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#aaa;width:120px;vertical-align:top;">الاسم</td>
              <td style="padding:10px 0;color:#fff;font-weight:bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#aaa;vertical-align:top;">البريد الإلكتروني</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#C0392B;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding:10px 0;color:#aaa;vertical-align:top;">الهاتف</td>
              <td style="padding:10px 0;color:#fff;">${phone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:10px 0;color:#aaa;vertical-align:top;">الرسالة</td>
              <td style="padding:10px 0;color:#fff;white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;color:#555;font-size:12px;">
            SKY EXPO Event Solutions &nbsp;·&nbsp; skyexpo.com.sa
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return NextResponse.json(
        { error: "Failed to send", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const e = err as Error;
    console.error("[Contact API Error]", e.message);
    return NextResponse.json(
      { error: "Failed to send", detail: e.message },
      { status: 500 }
    );
  }
}
