// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

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

    // For now, we'll use a third-party email service or simple logging
    // This can be replaced with your preferred email service
    const formData = {
      name,
      email,
      reason,
      message,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    // Log the form submission (in production, you might want to store this in a database)
    console.log('New contact form submission:', formData);

    // Try to send via Resend (a simple email service for Vercel)
    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Studio Pickens <noreply@studiopickens.com>',
            to: [process.env.CONTACT_EMAIL || 'hello@studiopickens.com'],
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
                  This email was sent from the Studio Pickens contact form at ${new Date().toLocaleString()}.
                </p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`Resend API error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Email sent via Resend:', result);

      } catch (resendError) {
        console.error('Resend email failed:', resendError);
        // Continue to success response even if email fails - the form data is still logged
      }
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Your message has been received successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}