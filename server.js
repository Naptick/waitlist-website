const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Waitlist User Schema
const waitlistUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: String,
  country: String,
  city: String,
  refCode: { type: String, required: true, unique: true },
  referrerCode: String,
  referralCount: { type: Number, default: 0 },
  
  // Attribution
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  utm_term: String,
  utm_content: String,
  landing_url: String,
  referrer_url: String,
  
  // Device Data
  userAgent: String,
  deviceType: String,
  ipHash: String,
  signupLocation: {
    country: String,
    region: String,
    city: String,
    timezone: String,
    latitude: Number,
    longitude: Number
  },
  
  // System
  emailVerified: { type: Boolean, default: false },
  status: { type: String, default: 'active' },
}, {
  timestamps: true
});

const WaitlistUser = mongoose.model('WaitlistUser', waitlistUserSchema);

// Generate unique referral code
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 11).toUpperCase();
}

// Send welcome email
async function sendWelcomeEmail(user, referralUrl) {
  const mailOptions = {
    from: `"Naptick" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Welcome to the Naptick Waitlist 🌙',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Welcome to Naptick Waitlist</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6C63FF;">Welcome to Naptick! 🌙</h1>
          </div>
          
          <p>Hi ${user.fullName || 'there'},</p>
          
          <p>Thanks for joining the Naptick waitlist! You're now part of an exclusive community that will get early access to the app that's going to revolutionize how we sleep.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
              <h3 style="margin: 0 0 15px 0; color: #6C63FF;">Share & Skip the Line!</h3>
              <p style="margin: 0 0 15px 0;">Your personal referral link:</p>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 2px dashed #6C63FF; font-family: monospace; font-size: 14px; word-break: break-all;">
                  ${referralUrl}
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">Share this link with friends to move up the waitlist faster!</p>
          </div>
          
          <p>We'll keep you updated on our progress and notify you as soon as Naptick is ready for you to try.</p>
          
          <p>Sweet dreams ahead!</p>
          
          <p style="margin-top: 30px;">
              The Naptick Team<br>
              <a href="mailto:${process.env.REACT_APP_SUPPORT_EMAIL}" style="color: #6C63FF;">${process.env.REACT_APP_SUPPORT_EMAIL}</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">
              If you didn't sign up for this, you can safely ignore this email.
          </p>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', user.email);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}

// API Routes
app.post('/api/waitlist/signup', async (req, res) => {
  try {
    const {
      email,
      fullName,
      country,
      city,
      referrerCode,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      landing_url,
      referrer_url,
      userAgent,
      deviceType,
      ipHash,
      signupLocation
    } = req.body;

    // Check if user already exists
    const existingUser = await WaitlistUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Generate unique referral code
    let refCode;
    do {
      refCode = generateReferralCode();
    } while (await WaitlistUser.findOne({ refCode }));

    // Create new user
    const newUser = new WaitlistUser({
      email,
      fullName,
      country,
      city,
      refCode,
      referrerCode,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      landing_url,
      referrer_url,
      userAgent,
      deviceType,
      ipHash,
      signupLocation
    });

    await newUser.save();

    // If user was referred, increment referrer's count
    if (referrerCode) {
      await WaitlistUser.findOneAndUpdate(
        { refCode: referrerCode },
        { $inc: { referralCount: 1 } }
      );
    }

    // Return success with referral link
    const referralUrl = `${process.env.REACT_APP_REFERRAL_BASE_URL}/?ref=${refCode}`;
    
    // Send welcome email (async, don't wait for it)
    sendWelcomeEmail(newUser, referralUrl);
    
    res.status(201).json({
      message: 'Successfully joined waitlist!',
      user: {
        email: newUser.email,
        fullName: newUser.fullName,
        refCode: newUser.refCode,
        referralUrl,
        position: await WaitlistUser.countDocuments({ createdAt: { $lte: newUser.createdAt } })
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get waitlist stats
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const totalUsers = await WaitlistUser.countDocuments();
    const totalReferrals = await WaitlistUser.aggregate([
      { $group: { _id: null, total: { $sum: '$referralCount' } } }
    ]);
    
    const viralCoefficient = totalUsers > 0 ? (totalReferrals[0]?.total || 0) / totalUsers : 0;
    
    res.json({
      totalUsers,
      totalReferrals: totalReferrals[0]?.total || 0,
      viralCoefficient: parseFloat(viralCoefficient.toFixed(2))
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by referral code
app.get('/api/waitlist/user/:refCode', async (req, res) => {
  try {
    const user = await WaitlistUser.findOne({ refCode: req.params.refCode });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const position = await WaitlistUser.countDocuments({ createdAt: { $lte: user.createdAt } });
    
    res.json({
      email: user.email,
      fullName: user.fullName,
      refCode: user.refCode,
      referralCount: user.referralCount,
      position
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});