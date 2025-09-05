# Custom Waitlist Implementation Plan

## 1. Database Schema Design (DynamoDB)

### Primary Table: `waitlist-users`

```javascript
{
  pk: "USER#{email}",           // Primary key
  sk: "PROFILE",                // Sort key
  
  // User Data
  email: "user@example.com",    // Required, unique
  fullName: "John Doe",         // Optional
  country: "United States",     // Editable, auto-filled
  city: "New York",            // Editable, auto-filled
  
  // Referral System
  refCode: "ABC123XYZ",        // Unique 9-char code
  referrerCode: "DEF456UVW",   // Who referred them (nullable)
  referralCount: 5,            // How many they referred
  
  // Attribution Data
  utm_source: "google",
  utm_medium: "cpc", 
  utm_campaign: "launch",
  utm_term: "sleep app",
  utm_content: "ad1",
  landing_url: "https://waitlist.naptick.com/?ref=ABC123",
  referrer_url: "https://google.com",
  
  // Device & Environment
  userAgent: "Mozilla/5.0...",
  deviceType: "mobile",        // desktop/mobile/tablet
  ipHash: "sha256hash",        // Hashed IP for fraud detection
  
  // Geolocation (from IP)
  signupLocation: {
    country: "United States",
    region: "New York",
    city: "New York",
    timezone: "America/New_York",
    latitude: 40.7128,
    longitude: -74.0060
  },
  
  // System Fields
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  emailVerified: true,
  status: "active"             // active/blocked/deleted
}
```

### Secondary Index: `referral-code-index`
- GSI on `refCode` for quick referral lookups

## 2. Frontend Components

### 2.1 Custom Waitlist Form Component
**File**: `/src/components/waitlist/CustomWaitlistForm.js`

```javascript
// Key Features:
- Email validation (required)
- Full name input (optional)  
- Country/city dropdowns (pre-filled, editable)
- Hidden fields for UTM capture
- Loading states
- Error handling
- Success animation
```

### 2.2 Post-Submit Share Modal
**File**: `/src/components/waitlist/ShareModal.js`

```javascript
// Features:
- Thank you message
- Referral link display + copy button
- Share buttons: WhatsApp, Twitter, Facebook, Email
- Social share templates
- Close modal functionality
```

### 2.3 Geolocation Service
**File**: `/src/services/geolocationService.js`

```javascript
// API Integration:
- Primary: ipapi.co (free 30k/month)
- Fallback: ipinfo.io
- Error handling for API failures
- Caching to avoid multiple calls
```

## 3. Backend Implementation (AWS Amplify)

### 3.1 GraphQL Schema
**File**: `/amplify/backend/api/schema.graphql`

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
}
```

### 3.2 Lambda Functions

#### A. Signup Handler
**File**: `/amplify/backend/function/waitlistSignup/src/index.js`

```javascript
// Responsibilities:
- Validate email uniqueness
- Generate unique referral code
- Process geolocation data
- Hash IP address
- Save to DynamoDB
- Increment referrer count
- Trigger welcome email
```

#### B. Email Handler  
**File**: `/amplify/backend/function/sendWelcomeEmail/src/index.js`

```javascript
// SES Integration:
- HTML email template
- Personalized greeting
- Referral link inclusion
- Unsubscribe link
- Delivery tracking
```

## 4. Implementation Steps

### Phase 1: Core Infrastructure
1. ✅ Create waitlist switch system
2. Create database schema in Amplify
3. Set up basic GraphQL mutations
4. Create geolocation service

### Phase 2: Frontend Components  
5. Build custom waitlist form
6. Implement form validation
7. Add loading/success states
8. Create share modal component

### Phase 3: Backend Integration
9. Implement signup Lambda function
10. Add referral code generation
11. Set up welcome email system
12. Add referral tracking logic

### Phase 4: Enhancement
13. Add social share functionality
14. Implement anti-fraud measures
15. Create admin export functionality
16. Add analytics tracking

## 5. Key Integration Points

### 5.1 Switching Providers
```javascript
// In /src/config/waitlistConfig.js
export const waitlistConfig = {
  provider: WAITLIST_PROVIDERS.CUSTOM,  // <-- Change this
  // ... rest of config
};
```

### 5.2 Unified Service Call
```javascript
// All components use this single function
import { joinWaitlist } from '../utils/waitlistService';

const handleJoinWaitlist = async () => {
  try {
    const result = await joinWaitlist();
    if (result.showForm) {
      // Show custom form modal
    }
  } catch (error) {
    // Handle error
  }
};
```

## 6. Environment Setup Requirements

### Required AWS Services
- **DynamoDB**: User data storage
- **Lambda**: Serverless functions
- **SES**: Email delivery 
- **AppSync**: GraphQL API
- **Cognito**: Optional user authentication
- **CloudWatch**: Logging and monitoring

### Environment Variables Needed
```bash
# Geolocation API
REACT_APP_IPAPI_KEY=your_ipapi_key
REACT_APP_GEOLOCATION_FALLBACK=ipinfo

# Custom waitlist API
REACT_APP_WAITLIST_API=/api/waitlist
REACT_APP_REFERRAL_BASE_URL=https://waitlist.naptick.com

# Email settings
REACT_APP_FROM_EMAIL=noreply@naptick.com
REACT_APP_SUPPORT_EMAIL=support@naptick.com
```

## 7. Testing Strategy

### Unit Tests
- Form validation logic
- Referral code generation
- Geolocation service
- Email template rendering

### Integration Tests  
- End-to-end signup flow
- Referral tracking accuracy
- Email delivery verification
- Database operations

### Load Testing
- Form submission under load
- Database write performance
- Email delivery at scale

## 8. Security Considerations

### Data Protection
- Hash IP addresses before storage
- Validate email formats server-side
- Sanitize all user inputs
- Rate limit form submissions

### Anti-Fraud Measures
- Block disposable email domains
- Detect same-device self-referrals
- Monitor unusual referral patterns
- Implement CAPTCHA if needed

## 9. Analytics & Monitoring

### Key Metrics
- Conversion rate (visitors → signups)
- Viral coefficient (referrals per user)
- Geographic distribution
- Device/browser breakdown
- Email open/click rates

### Tracking Events
- Form view
- Form submission
- Referral link generation
- Share button clicks
- Email opens/clicks

## 10. Deployment Checklist

### Pre-Deploy
- [ ] Test switch between ViralLoop and Custom
- [ ] Verify all environment variables
- [ ] Test geolocation API integration
- [ ] Validate database schema
- [ ] Test email delivery

### Post-Deploy
- [ ] Monitor error rates
- [ ] Verify referral tracking
- [ ] Check email delivery stats
- [ ] Monitor database performance
- [ ] Test admin export functionality

---

**Current Status**: Switch system implemented and ready. Next step is to switch provider to `CUSTOM` in config and begin Phase 1 implementation.

**Files Ready for Custom Implementation**:
- `/src/config/waitlistConfig.js` - Switch provider here
- `/src/utils/waitlistService.js` - Service layer ready
- All existing components updated to use unified service