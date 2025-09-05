# AWS Amplify Setup Instructions for Custom Waitlist

## 1. Initialize Amplify Project

```bash
# Install Amplify CLI if not already installed
npm install -g @aws-amplify/cli

# Initialize Amplify in project root
amplify init

# Project configuration:
# - Project name: naptick-waitlist
# - Environment: dev
# - Default editor: Visual Studio Code
# - App type: javascript
# - Framework: react
# - Source Directory Path: src
# - Distribution Directory Path: build
# - Build Command: npm run build
# - Start Command: npm start
```

## 2. Add Required Services

### A. Add GraphQL API + Database
```bash
amplify add api

# Choose:
# - GraphQL
# - API Name: waitlistAPI
# - Authorization type: API key (for public access)
# - Do you want to configure advanced settings? Yes
# - Configure additional auth types? No
# - Do you have an annotated GraphQL schema? Yes
# - Provide your schema file path: ./schema.graphql
```

Create `schema.graphql` in project root:
```graphql
type WaitlistUser @model @auth(rules: [{allow: public, operations: [create, read]}]) {
  id: ID!
  email: String! @primaryKey
  fullName: String
  country: String
  city: String
  refCode: String! @index(name: "byRefCode")
  referrerCode: String
  referralCount: Int!
  
  # Attribution
  utm_source: String
  utm_medium: String
  utm_campaign: String
  utm_term: String
  utm_content: String
  landing_url: String
  referrer_url: String
  
  # Device Data
  userAgent: String
  deviceType: String
  ipHash: String
  signupLocation: AWSJSON
  
  # System
  emailVerified: Boolean!
  status: String!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type ReferralStats {
  totalUsers: Int!
  totalReferrals: Int!
  viralCoefficient: Float!
  topReferrers: [WaitlistUser!]!
}

type Query {
  getReferralStats: ReferralStats @auth(rules: [{allow: private}])
  listWaitlistUsersByReferrer(referrerCode: String!): [WaitlistUser!]! @auth(rules: [{allow: public}])
}
```

### B. Add Authentication (for Admin)
```bash
amplify add auth

# Choose:
# - Default configuration
# - Username
# - No advanced settings needed for basic setup
```

### C. Add Function for Email Service
```bash
amplify add function

# Choose:
# - Lambda function (serverless function)
# - Function name: sendWelcomeEmail
# - Runtime: NodeJS
# - Template: Hello World
# - Do you want to configure advanced settings? Yes
# - Do you want to access other resources? Yes
# - Select SES
```

### D. Add Storage for Admin Exports
```bash
amplify add storage

# Choose:
# - Content (Images, audio, video, etc.)
# - Resource name: waitlistExports
# - Bucket name: (use default)
# - Who should have access: Auth users only
# - What kind of access: read/write
```

## 3. Environment Variables

Create `.env` file in project root:
```bash
# Geolocation APIs
REACT_APP_IPAPI_KEY=your_ipapi_key_here
REACT_APP_GEOLOCATION_FALLBACK=ipinfo

# Referral system
REACT_APP_REFERRAL_BASE_URL=https://waitlist.naptick.com

# Email settings
REACT_APP_FROM_EMAIL=noreply@naptick.com
REACT_APP_SUPPORT_EMAIL=support@naptick.com

# Development mode
REACT_APP_MOCK_BACKEND=true
```

Add to `.env.production`:
```bash
# Same as above but with production values
REACT_APP_MOCK_BACKEND=false
REACT_APP_REFERRAL_BASE_URL=https://waitlist.naptick.com
```

## 4. Deploy Services

```bash
# Deploy all backend services
amplify push

# This will:
# - Create DynamoDB table for WaitlistUser
# - Set up GraphQL API with AppSync
# - Create Lambda function for emails
# - Set up S3 bucket for exports
# - Configure IAM roles and permissions
```

## 5. Configure SES Email Service

### In AWS Console:
1. Go to SES (Simple Email Service)
2. Verify your domain: `naptick.com`
3. Create email templates:
   - Template name: `WelcomeEmail`
   - Subject: `Welcome to the Naptick Waitlist 🚀`
   - HTML body: (see email template below)

### Email Template HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Naptick Waitlist</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://waitlist.naptick.com/logo.png" alt="Naptick Logo" style="width: 120px; height: auto;">
    </div>
    
    <h1 style="color: #6C63FF; text-align: center;">Welcome to Naptick! 🌙</h1>
    
    <p>Hi {{fullName}},</p>
    
    <p>Thanks for joining the Naptick waitlist! You're now part of an exclusive community that will get early access to the app that's going to revolutionize how we sleep.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
        <h3 style="margin: 0 0 15px 0; color: #6C63FF;">Share & Skip the Line!</h3>
        <p style="margin: 0 0 15px 0;">Your personal referral link:</p>
        <div style="background: white; padding: 15px; border-radius: 8px; border: 2px dashed #6C63FF; font-family: monospace; font-size: 14px; word-break: break-all;">
            {{referralUrl}}
        </div>
        <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">Share this link with friends to move up the waitlist faster!</p>
    </div>
    
    <p>We'll keep you updated on our progress and notify you as soon as Naptick is ready for you to try.</p>
    
    <p>Sweet dreams ahead!</p>
    
    <p style="margin-top: 30px;">
        The Naptick Team<br>
        <a href="mailto:support@naptick.com" style="color: #6C63FF;">support@naptick.com</a>
    </p>
    
    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    <p style="font-size: 12px; color: #666; text-align: center;">
        If you didn't sign up for this, you can safely ignore this email.
    </p>
</body>
</html>
```

## 6. Required IAM Permissions

### Lambda Execution Role needs:
- `dynamodb:PutItem` on waitlist table
- `dynamodb:GetItem` on waitlist table  
- `dynamodb:UpdateItem` on waitlist table
- `ses:SendTemplatedEmail`
- `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`

### API Gateway needs:
- Access to Lambda functions
- Access to DynamoDB via AppSync

## 7. Domain Configuration

### In Amplify Console:
1. Add custom domain: `waitlist.naptick.com`
2. Configure SSL certificate
3. Set up redirects in `public/_redirects`:

```
# Referral links
/?ref=:code  /  200
/*           /index.html  200
```

## 8. Monitoring & Analytics

### CloudWatch Dashboards:
- Signup rate metrics
- Referral conversion tracking  
- Email delivery rates
- API error rates
- Database performance

### Custom Metrics to Track:
- Daily signups
- Viral coefficient (referrals per user)
- Geographic distribution
- Device breakdown
- Email engagement rates

## 9. Production Deployment

```bash
# Deploy to production
amplify publish

# Configure production domain
amplify add hosting

# Choose:
# - Amazon CloudFront and S3
# - DEV (Entire Team)
# - index.html
# - error.html
```

## 10. Post-Deployment Tasks

1. **Test all flows:**
   - Normal signup
   - Referral signup
   - Email delivery
   - Share functionality

2. **Configure monitoring:**
   - Set up CloudWatch alarms
   - Configure error notifications
   - Monitor signup volume

3. **Security checklist:**
   - Verify API rate limiting
   - Test email validation
   - Check referral fraud prevention
   - Validate data sanitization

## 11. Environment Variables in Amplify Console

Go to Amplify Console > App Settings > Environment Variables:

```
REACT_APP_IPAPI_KEY=your_key_here
REACT_APP_GEOLOCATION_FALLBACK=ipinfo
REACT_APP_REFERRAL_BASE_URL=https://waitlist.naptick.com
REACT_APP_FROM_EMAIL=noreply@naptick.com
REACT_APP_SUPPORT_EMAIL=support@naptick.com
REACT_APP_MOCK_BACKEND=false
```

## 12. Cost Estimates (Monthly)

- **DynamoDB**: $1-5 (depending on volume)
- **AppSync**: $4 per million operations
- **Lambda**: $0.20 per million requests
- **SES**: $0.10 per 1,000 emails
- **S3**: $1-3 for storage
- **CloudFront**: $1-10 for CDN

**Total estimated cost**: $10-25/month for moderate usage (10k signups/month)