import ReactGA from 'react-ga4';

// Your Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-Q3VHY38MY8';

// Initialize Google Analytics
export const initGA = () => {
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      // Enable debug mode in development
      debug: process.env.NODE_ENV === 'development',
      // Configuration options for privacy
      gtagOptions: {
        anonymize_ip: true, // GDPR compliance
        send_page_view: true, // Automatically send page views
      },
    });
    
    // More visible console log with styling
    console.log(
      '%c✅ Google Analytics initialized successfully! 🎉', 
      'color: #4CAF50; font-weight: bold; font-size: 16px;'
    );
    console.log(
      '%c📊 Measurement ID: ' + GA_MEASUREMENT_ID, 
      'color: #2196F3; font-weight: bold;'
    );
    console.log(
      '%c🔍 Debug mode: ' + (process.env.NODE_ENV === 'development' ? 'ON' : 'OFF'), 
      'color: #FF9800; font-weight: bold;'
    );
    
    // Test if gtag is available
    if (window.gtag) {
      console.log(
        '%c🎯 gtag function available - ready to track events!', 
        'color: #9C27B0; font-weight: bold;'
      );
    }
    
  } catch (error) {
    console.error(
      '%c❌ Failed to initialize Google Analytics:', 
      'color: #F44336; font-weight: bold;', 
      error
    );
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path || window.location.pathname + window.location.search,
  });
};

// Generic event tracking
export const trackEvent = (action, category = 'General', label = '', value = 0) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};

// ==========================================
// 1. WAITLIST SIGNUP TRACKING
// ==========================================
export const trackWaitlistSignup = {
  // When user focuses on email input
  started: () => {
    trackEvent('waitlist_signup_started', 'Conversion', 'Email Input Focus');
  },
  
  // When user successfully submits email
  completed: (email) => {
    trackEvent('waitlist_signup_completed', 'Conversion', 'Success', 1);
    // Also track as a conversion goal
    ReactGA.gtag('event', 'conversion', {
      'send_to': GA_MEASUREMENT_ID,
      'event_callback': () => console.log('Waitlist signup tracked')
    });
  },
  
  // If signup fails
  failed: (error) => {
    trackEvent('waitlist_signup_failed', 'Conversion', error || 'Unknown Error');
  },
  
  // Track referral popup "Join Now" click
  referralJoinClicked: () => {
    trackEvent('referral_join_now_clicked', 'Conversion', 'Referral Popup', 1);
  }
};

// ==========================================
// 2. CTA CLICK TRACKING
// ==========================================
export const trackCTAClick = (buttonText, location) => {
  // Track the specific CTA
  trackEvent('cta_click', 'Engagement', `${buttonText} - ${location}`);
  
  // Also categorize by button type
  if (buttonText.toLowerCase().includes('waitlist') || buttonText.toLowerCase().includes('join')) {
    trackEvent('primary_cta_click', 'Conversion', location);
  } else if (buttonText.toLowerCase().includes('video') || buttonText.toLowerCase().includes('watch')) {
    trackEvent('video_cta_click', 'Engagement', location);
  } else {
    trackEvent('secondary_cta_click', 'Engagement', `${buttonText} - ${location}`);
  }
};

// ==========================================
// 3. TIME ON PAGE TRACKING
// ==========================================
let startTime = Date.now();
let timeTracked = false;

export const initTimeTracking = () => {
  startTime = Date.now();
  timeTracked = false;
  
  // Track time when user leaves
  window.addEventListener('beforeunload', trackTimeOnPage);
  
  // Also track at intervals
  const intervals = [10, 30, 60, 120, 300]; // seconds
  intervals.forEach(seconds => {
    setTimeout(() => {
      if (!timeTracked) {
        trackEvent('time_on_page', 'Engagement', `${seconds}+ seconds`, seconds);
      }
    }, seconds * 1000);
  });
};

export const trackTimeOnPage = () => {
  if (!timeTracked) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page_total', 'Engagement', `${timeSpent} seconds`, timeSpent);
    timeTracked = true;
  }
};

// ==========================================
// 4. GEOGRAPHIC/DEMOGRAPHIC DATA
// ==========================================
// GA4 collects this automatically, but we can add custom dimensions
export const trackUserDemographics = (data) => {
  if (data.country) {
    trackEvent('user_country', 'Demographics', data.country);
  }
  if (data.language) {
    trackEvent('user_language', 'Demographics', data.language);
  }
  // GA4 automatically tracks: country, city, language, device, browser
};

// ==========================================
// 5. REFERRAL SOURCE TRACKING
// ==========================================
export const trackReferralSource = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source');
  const medium = urlParams.get('utm_medium');
  const campaign = urlParams.get('utm_campaign');
  
  // Track UTM parameters if they exist
  if (source || medium || campaign) {
    trackEvent('utm_tracking', 'Acquisition', 
      `source:${source || 'none'} | medium:${medium || 'none'} | campaign:${campaign || 'none'}`
    );
  }
  
  // Track document referrer
  if (document.referrer) {
    const referrerDomain = new URL(document.referrer).hostname;
    trackEvent('referrer', 'Acquisition', referrerDomain);
    
    // Track specific known sources
    if (referrerDomain.includes('producthunt.com')) {
      trackEvent('referral_source', 'Acquisition', 'ProductHunt');
    } else if (referrerDomain.includes('instagram.com')) {
      trackEvent('referral_source', 'Acquisition', 'Instagram');
    } else if (referrerDomain.includes('twitter.com') || referrerDomain.includes('x.com')) {
      trackEvent('referral_source', 'Acquisition', 'Twitter/X');
    } else if (referrerDomain.includes('linkedin.com')) {
      trackEvent('referral_source', 'Acquisition', 'LinkedIn');
    } else if (referrerDomain.includes('facebook.com')) {
      trackEvent('referral_source', 'Acquisition', 'Facebook');
    } else if (referrerDomain.includes('google.com')) {
      trackEvent('referral_source', 'Acquisition', 'Google Search');
    }
  } else {
    trackEvent('referral_source', 'Acquisition', 'Direct');
  }
};

// ==========================================
// 6. SECTION VIEW TRACKING
// ==========================================
export const trackSectionView = (sectionName) => {
  trackEvent('section_viewed', 'Engagement', sectionName);
  
  // Also track as scroll milestone
  const sectionOrder = {
    'Hero': 1,
    'Sleep Problems': 2,
    'Ring Features': 3,
    'Naphome': 4,
    'Inside Naphome': 5,
    'App Section': 6,
    'Video Section': 7,
    'Footer': 8
  };
  
  if (sectionOrder[sectionName]) {
    trackEvent('scroll_milestone', 'Engagement', 
      `Section ${sectionOrder[sectionName]}: ${sectionName}`, 
      sectionOrder[sectionName]
    );
  }
};

// ==========================================
// 7. VIDEO TRACKING
// ==========================================
export const trackVideo = {
  play: (videoName) => {
    trackEvent('video_play', 'Engagement', videoName);
  },
  
  pause: (videoName, progress) => {
    trackEvent('video_pause', 'Engagement', videoName, Math.round(progress));
  },
  
  complete: (videoName) => {
    trackEvent('video_complete', 'Engagement', videoName, 100);
  },
  
  modalOpened: (videoName) => {
    trackEvent('video_modal_opened', 'Engagement', videoName);
  },
  
  modalClosed: (videoName, watchTime) => {
    trackEvent('video_modal_closed', 'Engagement', videoName, watchTime);
  }
};

// ==========================================
// 8. SCROLL DEPTH TRACKING
// ==========================================
let scrollDepthTracked = new Set();

export const trackScrollDepth = () => {
  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );
  
  // Track at 25%, 50%, 75%, 100%
  [25, 50, 75, 100].forEach(milestone => {
    if (scrollPercentage >= milestone && !scrollDepthTracked.has(milestone)) {
      trackEvent('scroll_depth', 'Engagement', `${milestone}%`, milestone);
      scrollDepthTracked.add(milestone);
    }
  });
};

// ==========================================
// 9. SOCIAL MEDIA TRACKING
// ==========================================
export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'Social', platform);
};

// ==========================================
// 10. ERROR TRACKING
// ==========================================
export const trackError = (errorType, errorMessage) => {
  trackEvent('error', 'Technical', `${errorType}: ${errorMessage}`);
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Initialize all tracking when called
export const initializeTracking = () => {
  // Initialize GA
  initGA();
  
  // Track initial page view
  trackPageView();
  
  // Track referral source
  trackReferralSource();
  
  // Initialize time tracking
  initTimeTracking();
  
  // Initialize scroll tracking
  window.addEventListener('scroll', trackScrollDepth);
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackEvent('page_visibility', 'Engagement', 'Hidden');
    } else {
      trackEvent('page_visibility', 'Engagement', 'Visible');
    }
  });
};

// Track user engagement quality
export const trackEngagementQuality = () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );
  
  if (timeOnPage > 30 && scrollPercentage > 50) {
    trackEvent('engaged_user', 'Engagement', 'High Quality Visit', 1);
  }
};

// Export all tracking functions
export default {
  initializeTracking,
  trackPageView,
  trackEvent,
  trackWaitlistSignup,
  trackCTAClick,
  trackSectionView,
  trackVideo,
  trackSocialClick,
  trackError,
  trackEngagementQuality,
  trackReferralSource,
  trackScrollDepth
};