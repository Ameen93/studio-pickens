const nodemailer = require('nodemailer');

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, reason, message } = req.body;

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Studio Pickens Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@studiopickens.com',
      subject: `New Contact Form Submission - ${reason}`,
      html: `
        <div style="font-family: 'Proxima Nova', Arial, sans-serif; color: #0025B8; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0025B8; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #F8F7F7; padding: 20px; margin: 20px 0; border-left: 4px solid #FF7E46;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Reason for Contact:</strong> ${reason}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; padding: 10px; background: white; border-radius: 4px;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the Studio Pickens contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Reason: ${reason}
        
        Message:
        ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return error response
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
}