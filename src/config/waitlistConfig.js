export const WAITLIST_PROVIDERS = {
  VIRALLOOP: 'viralloop',
  CUSTOM: 'custom'
};

export const waitlistConfig = {
  provider: WAITLIST_PROVIDERS.CUSTOM,
  viralloop: {
    campaignId: 'Q8HkUB784WN0NDytaI3oIH674K8',
    scriptId: 'viral-loops-loader'
  },
  custom: {
    apiEndpoint: process.env.REACT_APP_WAITLIST_API || '/api/waitlist',
    enableAnalytics: true
  }
};

export const getWaitlistProvider = () => {
  return waitlistConfig.provider;
};

export const isViralLoopEnabled = () => {
  return waitlistConfig.provider === WAITLIST_PROVIDERS.VIRALLOOP;
};

export const isCustomWaitlistEnabled = () => {
  return waitlistConfig.provider === WAITLIST_PROVIDERS.CUSTOM;
};