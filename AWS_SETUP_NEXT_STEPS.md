# AWS Setup Next Steps for Custom Waitlist

## Phase 1: Complete Implementation ✅

### Frontend Components Created:
- ✅ **Switch system**: Toggle between ViralLoop and Custom
- ✅ **Custom form**: `/src/components/waitlist/CustomWaitlistForm.js`
- ✅ **Share modal**: `/src/components/waitlist/ShareModal.js`  
- ✅ **Services**: Geolocation, referrals, attribution tracking
- ✅ **GraphQL operations**: Mutations and queries ready
- ✅ **Amplify structure**: Backend configuration prepared

### Current Status: 
**Ready for AWS backend setup!** All frontend code is complete and waiting for real AWS services.

---

## Phase 2: AWS Backend Setup (YOUR NEXT STEPS)

### Prerequisites:
1. **AWS Account** with appropriate permissions
2. **AWS CLI configured** with your credentials
3. **Amplify CLI installed** (already done)

### Step 1: Configure AWS CLI
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key  
# Enter your default region (us-east-1)
# Enter output format (json)
```

### Step 2: Initialize Amplify Project
```bash
cd /Users/user/waitlist/naptick-frontend
amplify init

# Use these settings:
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

### Step 3: Add API with Database
```bash
amplify add api

# Choose:
# - GraphQL
# - API Name: waitlistapi
# - Authorization: API key (public access)
# - Do you want to configure advanced settings? No
# - Do you have annotated GraphQL schema? Yes
# - Provide schema file: ./amplify/backend/api/schema.graphql
```

### Step 4: Add Function for Email Service
```bash
amplify add function

# Choose:
# - Lambda function
# - Function name: sendWelcomeEmail
# - Runtime: NodeJS
# - Template: Hello World
# - Advanced settings: Yes
# - Access other resources: Yes
# - Select: API (GraphQL)
```

### Step 5: Add Authentication (for Admin)
```bash
amplify add auth

# Choose:
# - Default configuration
# - Username
# - No advanced settings
```

### Step 6: Deploy Everything
```bash
amplify push

# This creates:
# - DynamoDB table for users
# - GraphQL API endpoint
# - Lambda function for emails
# - IAM roles and permissions
```

### Step 7: Configure SES Email Service

#### A. Verify Domain in AWS Console
1. Go to **SES Console** → **Verified Identities**
2. Click **Create Identity** → **Domain**
3. Enter: `naptick.com`
4. Follow verification steps (add DNS records)

#### B. Create Email Template
1. Go to **SES** → **Configuration** → **Templates**
2. Create template: `WelcomeEmail`
3. Use HTML from `AMPLIFY_SETUP_INSTRUCTIONS.md`

### Step 8: Update Frontend Configuration

After `amplify push`, update these files with real values:

#### A. Update `src/aws-exports.js` (auto-generated)
- File will be created automatically by Amplify

#### B. Add Environment Variables
Create `.env` file:
```bash
# Geolocation
REACT_APP_IPAPI_KEY=get_from_ipapi.co
REACT_APP_GEOLOCATION_FALLBACK=ipinfo

# URLs
REACT_APP_REFERRAL_BASE_URL=https://waitlist.naptick.com

# Email
REACT_APP_FROM_EMAIL=noreply@naptick.com
REACT_APP_SUPPORT_EMAIL=support@naptick.com
```

### Step 9: Configure Custom Domain
```bash
amplify add hosting

# Choose:
# - Amazon CloudFront and S3
# - Manual deployment
```

In **Amplify Console**:
1. Add domain: `waitlist.naptick.com`
2. Configure SSL certificate
3. Update DNS records

### Step 10: Deploy Frontend
```bash
amplify publish

# This deploys:
# - React app to S3
# - CloudFront distribution
# - Custom domain setup
```

---

## Phase 3: Testing & Verification

### After AWS Setup Complete:

1. **Test Custom Waitlist**:
   - Click "Join Waitlist" button
   - Custom form should appear
   - Fill in email, submit
   - Should see success modal with referral link

2. **Test Referral System**:
   - Use referral link: `?ref=ABCD12345`
   - Sign up new user
   - Check DynamoDB for referrer count increment

3. **Test Email Delivery**:
   - Sign up user
   - Check SES for sent email
   - Verify welcome email received

### Monitoring Setup:
```bash
# Add analytics
amplify add analytics

# Choose:
# - Amazon Pinpoint
# - Provide analytics resource name: waitlistAnalytics
```

---

## Required AWS Permissions

Your AWS user needs these permissions:
- **CloudFormation**: Full access
- **IAM**: Role creation and attachment
- **DynamoDB**: Table creation and management
- **AppSync**: API creation and management
- **Lambda**: Function creation and execution
- **SES**: Email sending permissions
- **S3**: Bucket creation and management
- **CloudFront**: Distribution management

---

## Cost Estimates (Monthly)

- **DynamoDB**: $1-5 (100k reads, 10k writes)
- **AppSync**: $4/million operations
- **Lambda**: $0.20/million requests
- **SES**: $0.10/1,000 emails
- **S3 + CloudFront**: $1-5
- **Total**: ~$10-20/month for moderate usage

---

## What's Already Done ✅

### Frontend (Complete):
- ✅ Custom waitlist form with validation
- ✅ Geolocation auto-fill (country/city)
- ✅ Referral code generation
- ✅ Share modal with social buttons
- ✅ Attribution tracking (UTMs, device info)
- ✅ Switch system (ViralLoop ↔ Custom)

### Backend Structure (Ready):
- ✅ GraphQL schema designed
- ✅ Amplify configuration files
- ✅ Database mutations and queries
- ✅ Email service structure
- ✅ Admin access patterns

### What You Need to Do:
1. **Configure AWS CLI** with your credentials
2. **Run the Amplify commands** listed above
3. **Set up SES domain verification**
4. **Add environment variables**
5. **Test the complete flow**

The frontend is **100% complete** and ready to connect to AWS services once you run the backend setup commands!

---

## Quick Test Without Backend

You can test the UI components right now:
1. Click "Join Waitlist" button
2. Custom form will appear (won't save to database yet)
3. Form includes country/city auto-fill
4. All validation and UI interactions work

Once AWS backend is set up, the same forms will save to DynamoDB and send welcome emails automatically.