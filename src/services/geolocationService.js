const IPAPI_ENDPOINT = 'https://ipapi.co/json/';
const IPINFO_FALLBACK = 'https://ipinfo.io/json';

export const getUserLocation = async () => {
  try {
    const response = await fetch(IPAPI_ENDPOINT);
    if (!response.ok) throw new Error('Primary API failed');
    
    const data = await response.json();
    
    return {
      country: data.country_name || '',
      region: data.region || '',
      city: data.city || '',
      timezone: data.timezone || '',
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      ip: data.ip || null
    };
  } catch (error) {
    console.warn('Primary geolocation failed, trying fallback:', error);
    return await getFallbackLocation();
  }
};

const getFallbackLocation = async () => {
  try {
    const response = await fetch(IPINFO_FALLBACK);
    if (!response.ok) throw new Error('Fallback API failed');
    
    const data = await response.json();
    const [city, region] = (data.city || '').split(', ');
    
    return {
      country: data.country || '',
      region: region || data.region || '',
      city: city || data.city || '',
      timezone: data.timezone || '',
      latitude: data.loc ? parseFloat(data.loc.split(',')[0]) : null,
      longitude: data.loc ? parseFloat(data.loc.split(',')[1]) : null,
      ip: data.ip || null
    };
  } catch (error) {
    console.warn('All geolocation services failed:', error);
    return {
      country: '',
      region: '',
      city: '',
      timezone: '',
      latitude: null,
      longitude: null,
      ip: null
    };
  }
};

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = 'desktop';
  
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    deviceType = 'tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    deviceType = 'mobile';
  }
  
  return {
    userAgent,
    deviceType,
    platform: navigator.platform || '',
    language: navigator.language || ''
  };
};

export const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_content: urlParams.get('utm_content') || '',
    ref: urlParams.get('ref') || ''
  };
};

export const getAttributionData = () => {
  return {
    landing_url: window.location.href,
    referrer_url: document.referrer || '',
    ...getUTMParams()
  };
};