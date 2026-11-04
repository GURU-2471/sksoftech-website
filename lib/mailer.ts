import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    path: string
    contentType?: string
  }>
}

export async function sendEmail({ to, subject, html, attachments }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"SK Softech" <${process.env.GMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      attachments,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

// Email templates
export function contactConfirmationTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: #0B1F4B; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #FFC21A; margin: 0; font-size: 24px;">SK Softech</h1>
        <p style="color: #fff; margin: 5px 0 0;">and Digital Marketing</p>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #0B1F4B;">Thank you, ${name}! 🎉</h2>
        <p style="color: #555; line-height: 1.6;">
          We've received your inquiry and our team will get back to you within <strong>24 hours</strong>.
        </p>
        <p style="color: #555; line-height: 1.6;">
          In the meantime, feel free to reach us at:<br/>
          📞 <strong>9307696221</strong><br/>
          📧 <strong>sksoftech2026@gmail.com</strong>
        </p>
        <div style="background: #0B1F4B; color: #fff; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
          <p style="margin: 0; font-style: italic;">"Your Vision | Our Technology | Your Growth"</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
          SK Softech and Digital Marketing | Pune, Maharashtra
        </p>
      </div>
    </div>
  `
}

export function contactNotificationTemplate(data: {
  name: string
  email: string
  phone?: string
  message: string
  serviceInterest?: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B1F4B; padding: 20px; text-align: center;">
        <h2 style="color: #FFC21A; margin: 0;">📩 New Contact Inquiry</h2>
      </div>
      <div style="background: #fff; padding: 25px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B; width: 140px;">Name:</td><td style="padding: 8px; color: #333;">${data.name}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Email:</td><td style="padding: 8px; color: #333;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Phone:</td><td style="padding: 8px; color: #333;">${data.phone || 'Not provided'}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Service:</td><td style="padding: 8px; color: #333;">${data.serviceInterest || 'General Inquiry'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B; vertical-align: top;">Message:</td><td style="padding: 8px; color: #333;">${data.message}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #FFF8E1; border-left: 4px solid #FFC21A;">
          <p style="margin: 0; color: #666; font-size: 14px;">Reply directly to this email or call the client at ${data.phone || 'phone not provided'}.</p>
        </div>
      </div>
    </div>
  `
}

export function applicationConfirmationTemplate(name: string, jobTitle: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: #0B1F4B; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #FFC21A; margin: 0; font-size: 24px;">SK Softech</h1>
        <p style="color: #fff; margin: 5px 0 0;">and Digital Marketing</p>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #0B1F4B;">Application Received! 🎉</h2>
        <p style="color: #555; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
        <p style="color: #555; line-height: 1.6;">
          Thank you for applying for the <strong>${jobTitle}</strong> position at SK Softech and Digital Marketing.
        </p>
        <p style="color: #555; line-height: 1.6;">
          Our HR team will review your application and get in touch within <strong>3-5 business days</strong>.
        </p>
        <div style="background: #0B1F4B; color: #fff; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
          <p style="margin: 0; font-style: italic;">"Let's Create Something Great Together!"</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
          SK Softech and Digital Marketing | Pune, Maharashtra | 9307696221
        </p>
      </div>
    </div>
  `
}

export function applicationNotificationTemplate(data: {
  applicantName: string
  email: string
  phone?: string
  jobTitle: string
  coverLetter?: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B1F4B; padding: 20px; text-align: center;">
        <h2 style="color: #FFC21A; margin: 0;">📋 New Job Application</h2>
      </div>
      <div style="background: #fff; padding: 25px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B; width: 140px;">Position:</td><td style="padding: 8px; color: #333;">${data.jobTitle}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Applicant:</td><td style="padding: 8px; color: #333;">${data.applicantName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Email:</td><td style="padding: 8px; color: #333;">${data.email}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #0B1F4B;">Phone:</td><td style="padding: 8px; color: #333;">${data.phone || 'Not provided'}</td></tr>
          ${data.coverLetter ? `<tr><td style="padding: 8px; font-weight: bold; color: #0B1F4B; vertical-align: top;">Cover Letter:</td><td style="padding: 8px; color: #333;">${data.coverLetter}</td></tr>` : ''}
        </table>
        <p style="color: #666; margin-top: 15px;">📎 Resume is attached to this email.</p>
      </div>
    </div>
  `
}
