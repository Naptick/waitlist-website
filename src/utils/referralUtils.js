export const generateReferralCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < 9; i++) {
    if (i === 3 || i === 6) {
      result += '';
    }
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

export const generateReferralUrl = (refCode) => {
  const baseUrl = process.env.REACT_APP_REFERRAL_BASE_URL || window.location.origin;
  return `${baseUrl}/?ref=${refCode}`;
};

export const validateReferralCode = (code) => {
  return /^[A-Z0-9]{9}$/.test(code);
};

export const hashIP = async (ip) => {
  if (!ip) return null;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const getShareTemplates = (refUrl) => {
  const message = encodeURIComponent("Join me on the Naptick waitlist! Get early access to the sleep improvement app that's changing how we sleep. 🌙✨");
  
  return {
    whatsapp: `https://wa.me/?text=${message} ${encodeURIComponent(refUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(refUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refUrl)}`,
    email: `mailto:?subject=${encodeURIComponent('Join me on the Naptick waitlist!')}&body=${message} ${encodeURIComponent(refUrl)}`,
    copy: refUrl
  };
};