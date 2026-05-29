export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body || {};

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Please fill out your name, phone number, and service.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured yet. Add RESEND_API_KEY in Vercel.' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'IronFaithDevelopment@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Iron Faith Website <onboarding@resend.dev>';

  const emailHtml = `
    <h2>New quote request from Iron Faith Development website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
    <p><strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message || 'No message provided.').replace(/\n/g, '<br />')}</p>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email || undefined,
        subject: `New quote request: ${service}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return res.status(500).json({ error: resendData.message || 'Email failed to send.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Server error while sending email.' });
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
