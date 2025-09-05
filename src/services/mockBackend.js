import { generateReferralCode } from '../utils/referralUtils';

const STORAGE_KEY = 'naptick_waitlist_users';

const getStoredUsers = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const mockSignupAPI = async (signupData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getStoredUsers();
  
  if (users.find(user => user.email === signupData.email)) {
    throw new Error('Email already registered');
  }
  
  let referralCount = 0;
  if (signupData.referrerCode) {
    const referrer = users.find(user => user.refCode === signupData.referrerCode);
    if (referrer) {
      referrer.referralCount = (referrer.referralCount || 0) + 1;
      referralCount = referrer.referralCount;
    }
  }
  
  const newUser = {
    id: Date.now().toString(),
    ...signupData,
    createdAt: new Date().toISOString(),
    referralCount: 0,
    emailVerified: true,
    status: 'active'
  };
  
  users.push(newUser);
  saveUsers(users);
  
  console.log('Mock signup successful:', newUser);
  console.log('Total users:', users.length);
  if (signupData.referrerCode) {
    console.log('Referrer credited:', referralCount);
  }
  
  return {
    success: true,
    user: newUser,
    message: 'Successfully joined the waitlist!'
  };
};

export const setupMockAPI = () => {
  window.fetch = (function(originalFetch) {
    return function(...args) {
      const [url, options] = args;
      
      if (url === '/api/waitlist/signup' && options?.method === 'POST') {
        const signupData = JSON.parse(options.body);
        
        return Promise.resolve({
          ok: true,
          json: () => mockSignupAPI(signupData)
        });
      }
      
      return originalFetch.apply(this, args);
    };
  })(window.fetch);
};