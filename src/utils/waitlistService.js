import { triggerViralLoopsPopup } from './viralLoops';
import { isViralLoopEnabled, isCustomWaitlistEnabled } from '../config/waitlistConfig';

export const joinWaitlist = async (email = null) => {
  if (isViralLoopEnabled()) {
    triggerViralLoopsPopup();
    return;
  }

  if (isCustomWaitlistEnabled()) {
    return { showCustomForm: true };
  }

  throw new Error('No waitlist provider configured');
};

export const submitCustomWaitlist = async (signupData) => {
  try {
    console.log('Submitting to custom waitlist:', signupData);
    
    const response = await fetch('http://localhost:5000/api/waitlist/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const result = await response.json();
    console.log('✅ Successfully saved to MongoDB:', result);

    return {
      success: true,
      user: result.user,
      message: result.message,
      referralUrl: result.user.referralUrl
    };
  } catch (error) {
    console.error('Custom waitlist submission failed:', error);
    throw error;
  }
};