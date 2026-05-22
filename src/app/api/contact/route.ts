import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST     || "mail.skyexpo.com.sa",
      port:   Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER || "info@skyexpo.com.sa",
        pass: process.env.SMTP_PASS || "",
      },
    });

    await transporter.sendMail({
      from:    `"SKY EXPO Website" <${process.env.SMTP_USER || "info@skyexpo.com.sa"}>`,
      to:      "info@skyexpo.com.sa",
      replyTo: email,
      subject: `رسالة جديدة من الموقع — ${name}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0f;color:#fff;border-radius:8px;">
          <div style="border-bottom:2px solid #C0392B;padding-bottom:16px;margin-bottom:24px;">
            <img src="https://skyexpo.com.sa/images/skyexpo-logo.png" alt="SKY EXPO" height="40" style="margin-bottom:8px;" />
            <h2 style="margin:0;color:#fff;font-size:20px;">رسالة جديدة من الموقع الإلكتروني</h2>
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
