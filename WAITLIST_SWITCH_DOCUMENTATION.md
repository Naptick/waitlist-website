# Waitlist Provider Switch Documentation

## Overview
This document describes the waitlist provider switch implementation that allows toggling between ViralLoop integration and a custom waitlist solution.

## File Structure

### Configuration Files

#### 1. `/src/config/waitlistConfig.js`
Main configuration file for waitlist providers.

```javascript
export const WAITLIST_PROVIDERS = {
  VIRALLOOP: 'viralloop',
  CUSTOM: 'custom'
};

export const waitlistConfig = {
  provider: WAITLIST_PROVIDERS.VIRALLOOP,  // <-- Switch provider here
  viralloop: {
    campaignId: 'Q8HkUB784WN0NDytaI3oIH674K8',
    scriptId: 'viral-loops-loader'
  },
  custom: {
    apiEndpoint: process.env.REACT_APP_WAITLIST_API || '/api/waitlist',
    enableAnalytics: true
  }
};
```

### Service Layer

#### 2. `/src/utils/waitlistService.js`
Unified service that routes to the appropriate provider based on configuration.

```javascript
export const joinWaitlist = async (email = null) => {
  if (isViralLoopEnabled()) {
    // Uses existing ViralLoop popup
    triggerViralLoopsPopup();
    return;
  }

  if (isCustomWaitlistEnabled()) {
    // Ready for custom implementation
    if (email) {
      return await submitCustomWaitlist(email);
    } else {
      return { showForm: true };
    }
  }
};
```

### Updated Components

#### 3. `/src/components/sections/HeroSectionNew.js`
- **Line 10-11**: Imports `joinWaitlist` service
- **Line 316**: `handleJoinWaitlist()` now calls unified `joinWaitlist()`

#### 4. `/src/components/layout/Header/Header.js`
- **Line 7**: Imports `joinWaitlist` service  
- **Line 311, 350**: Button onClick now calls `joinWaitlist()`

## How to Switch Providers

### To Use ViralLoop (Current Default)
```javascript
// In /src/config/waitlistConfig.js
provider: WAITLIST_PROVIDERS.VIRALLOOP
```

### To Use Custom Waitlist
```javascript
// In /src/config/waitlistConfig.js
provider: WAITLIST_PROVIDERS.CUSTOM
```

## Custom Waitlist Implementation

### Required Components for Custom Waitlist

1. **API Endpoint**
   - Default: `/api/waitlist`
   - Configurable via `REACT_APP_WAITLIST_API` environment variable
   - Expected to handle POST requests with email data

2. **Email Submission Handler**
   - Currently implemented in `submitCustomWaitlist()` function
   - Sends POST request with email and timestamp
   - Returns response or throws error

3. **UI Components (To Be Implemented)**
   - Custom form/modal component
   - Success/error messaging
   - Loading states
   - Analytics tracking (if enabled)

## Environment Variables

```bash
# Optional: Custom API endpoint for waitlist
REACT_APP_WAITLIST_API=/api/custom-waitlist
```

## Helper Functions Available

- `getWaitlistProvider()` - Returns current provider string
- `isViralLoopEnabled()` - Returns boolean if ViralLoop is active
- `isCustomWaitlistEnabled()` - Returns boolean if custom is active

## Testing the Switch

1. **Verify ViralLoop Works (Default)**
   - Click "Join the Waitlist" button
   - ViralLoop popup should appear

2. **Test Custom Switch**
   - Change provider in config to `CUSTOM`
   - Click "Join the Waitlist" button
   - Should trigger custom implementation (currently returns `{ showForm: true }`)

## Next Steps for Custom Implementation

1. Create custom waitlist UI component
2. Implement form validation
3. Add success/error states
4. Connect to backend API
5. Add analytics tracking
6. Implement email verification (optional)
7. Add referral system (optional)

## Files Modified in This Implementation

- Created: `/src/config/waitlistConfig.js`
- Created: `/src/utils/waitlistService.js`
- Modified: `/src/components/sections/HeroSectionNew.js`
- Modified: `/src/components/layout/Header/Header.js`

## Rollback Instructions

To revert to direct ViralLoop implementation:
1. Keep provider as `VIRALLOOP` in config
2. System will continue using existing ViralLoop integration
3. No code changes needed - backward compatible