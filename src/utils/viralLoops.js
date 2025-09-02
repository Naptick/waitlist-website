// Viral Loops utility functions

// Alternative manual popup function - creates a simple email input form as fallback
export const showManualEmailPopup = () => {
  const email = prompt('Join our waitlist! Please enter your email:');
  if (email && email.includes('@')) {
    alert(`Thanks! We'll notify you at ${email} when Naptick is ready.`);
    // Here you could send the email to your backend or a service like Mailchimp
    console.log('Manual email signup:', email);
  }
};

export const triggerViralLoopsPopup = () => {
  console.log('🚀 Triggering Viral Loops popup...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOM ready...');
    document.addEventListener('DOMContentLoaded', triggerViralLoopsPopup);
    return;
  }
  
  // Try different methods in order
  const methods = [
    () => tryDirectAPI(),
    () => tryExistingWidget(),
    () => tryCreatingWidget(),
    () => tryGlobalTrigger(),
    () => showManualEmailPopup() // Fallback
  ];
  
  let methodIndex = 0;
  
  const tryNextMethod = () => {
    if (methodIndex < methods.length) {
      const success = methods[methodIndex]();
      if (!success) {
        methodIndex++;
        setTimeout(tryNextMethod, 500);
      }
    }
  };
  
  tryNextMethod();
};

const tryDirectAPI = () => {
  console.log('📋 Method 1: Direct API call');
  console.log('ViralLoops object:', window.ViralLoops);
  console.log('ViralLoops methods:', Object.getOwnPropertyNames(window.ViralLoops));
  
  if (window.ViralLoops) {
    // Method A: Try accessing the campaign directly
    if (window.ViralLoops.campaigns && window.ViralLoops.campaigns.get) {
      console.log('🔍 Accessing campaign directly...');
      const campaign = window.ViralLoops.campaigns.get('Q8HkUB784WN0NDytaI3oIH674K8');
      console.log('Campaign object:', campaign);
      
      if (campaign) {
        // Try different methods on the campaign object
        const campaignMethods = ['show', 'open', 'trigger', 'popup'];
        for (const method of campaignMethods) {
          if (typeof campaign[method] === 'function') {
            console.log(`✅ Trying campaign.${method}()`);
            try {
              campaign[method]();
              console.log(`✅ campaign.${method}() succeeded!`);
              return true;
            } catch (error) {
              console.log(`❌ campaign.${method}() failed:`, error);
            }
          }
        }
      }
    }
    
    // Method B: Try global ViralLoops methods
    const globalMethods = ['show', 'open', 'trigger', 'popup', 'showPopup', 'openModal'];
    for (const method of globalMethods) {
      if (typeof window.ViralLoops[method] === 'function') {
        console.log(`✅ Trying ViralLoops.${method}()`);
        try {
          // Try with campaign ID
          window.ViralLoops[method]('Q8HkUB784WN0NDytaI3oIH674K8');
          console.log(`✅ ViralLoops.${method}() with ID succeeded!`);
          return true;
        } catch (error) {
          console.log(`❌ ViralLoops.${method}() with ID failed:`, error);
          try {
            // Try without parameters
            window.ViralLoops[method]();
            console.log(`✅ ViralLoops.${method}() without params succeeded!`);
            return true;
          } catch (error2) {
            console.log(`❌ ViralLoops.${method}() without params failed:`, error2);
          }
        }
      }
    }
    
    // Method C: Try triggering through prototype methods
    const prototype = Object.getPrototypeOf(window.ViralLoops);
    console.log('ViralLoops prototype methods:', Object.getOwnPropertyNames(prototype));
    
    for (const method of Object.getOwnPropertyNames(prototype)) {
      if (typeof window.ViralLoops[method] === 'function' && method.includes('show') || method.includes('open')) {
        console.log(`✅ Trying prototype method: ${method}`);
        try {
          window.ViralLoops[method]();
          console.log(`✅ ${method}() succeeded!`);
          return true;
        } catch (error) {
          console.log(`❌ ${method}() failed:`, error);
        }
      }
    }
  }
  
  console.log('❌ No working ViralLoops API method found');
  return false;
};

const tryExistingWidget = () => {
  console.log('📋 Method 2: Existing widget');
  const widget = document.querySelector('form-widget[mode="popup"]');
  console.log('Found widget:', widget);
  
  if (widget) {
    try {
      console.log('Widget has shadow root:', !!widget.shadowRoot);
      console.log('Widget properties:', Object.getOwnPropertyNames(widget));
      console.log('Widget methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(widget)));
      
      // Try to make it visible first
      widget.style.display = 'block';
      widget.style.visibility = 'visible';
      
      // Try calling methods directly on the web component
      const componentMethods = ['show', 'open', 'trigger', 'popup', 'showModal'];
      for (const method of componentMethods) {
        if (typeof widget[method] === 'function') {
          console.log(`✅ Trying widget.${method}()`);
          try {
            widget[method]();
            console.log(`✅ widget.${method}() succeeded!`);
            return true;
          } catch (error) {
            console.log(`❌ widget.${method}() failed:`, error);
          }
        }
      }
      
      // Try dispatching custom events that the component might listen for
      const customEvents = ['viral-loops-open', 'show-popup', 'open-modal', 'trigger-popup'];
      customEvents.forEach(eventType => {
        console.log(`📡 Dispatching custom event: ${eventType}`);
        const event = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: { campaignId: 'Q8HkUB784WN0NDytaI3oIH674K8' }
        });
        widget.dispatchEvent(event);
      });
      
      // Try standard click events
      widget.click();
      console.log('✅ Widget clicked');
      
      // Try focus and enter
      if (widget.focus) widget.focus();
      
      // If shadow root exists, try to interact with elements inside
      if (widget.shadowRoot) {
        console.log('🔍 Exploring shadow DOM...');
        const shadowElements = widget.shadowRoot.querySelectorAll('*');
        console.log('Shadow DOM elements:', shadowElements);
        
        shadowElements.forEach((element, index) => {
          console.log(`Shadow element ${index}:`, element);
          if (element.click && (element.tagName === 'BUTTON' || element.type === 'submit')) {
            console.log(`🎯 Clicking shadow element ${index}: ${element.tagName}`);
            try {
              element.click();
            } catch (error) {
              console.log(`❌ Shadow element click failed:`, error);
            }
          }
        });
      }
      
      // Dispatch multiple standard events
      const events = ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'focus'];
      events.forEach(eventType => {
        const event = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          view: window
        });
        widget.dispatchEvent(event);
      });
      
      return true;
    } catch (error) {
      console.log('❌ Widget interaction failed:', error);
    }
  }
  return false;
};

const tryCreatingWidget = () => {
  console.log('📋 Method 3: Creating new widget');
  
  try {
    const widget = document.createElement('form-widget');
    widget.setAttribute('mode', 'popup');
    widget.setAttribute('ucid', 'Q8HkUB784WN0NDytaI3oIH674K8');
    
    // Make it visible
    widget.style.position = 'fixed';
    widget.style.top = '50%';
    widget.style.left = '50%';
    widget.style.transform = 'translate(-50%, -50%)';
    widget.style.zIndex = '10000';
    widget.style.display = 'block';
    
    document.body.appendChild(widget);
    console.log('✅ Created and added widget');
    
    // Try to trigger it
    setTimeout(() => {
      widget.click();
      console.log('✅ New widget triggered');
    }, 100);
    
    return true;
  } catch (error) {
    console.log('❌ Widget creation failed:', error);
    return false;
  }
};

const tryGlobalTrigger = () => {
  console.log('📋 Method 4: Global trigger search');
  
  // Look for any possible viral loops triggers
  const selectors = [
    '[data-viral-loops]',
    '.viral-loops-trigger',
    '[data-campaign-id]',
    'form-widget',
    '*[ucid]'
  ];
  
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    console.log(`Found ${elements.length} elements for selector: ${selector}`);
    
    elements.forEach((el, index) => {
      console.log(`Triggering element ${index}:`, el);
      try {
        el.click();
        el.focus && el.focus();
        
        // Dispatch events
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        el.dispatchEvent(event);
      } catch (error) {
        console.log('Element trigger failed:', error);
      }
    });
    
    if (elements.length > 0) return true;
  }
  
  return false;
};

export const checkViralLoopsStatus = () => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkLoaded = () => {
      attempts++;
      console.log(`🔍 Checking Viral Loops... Attempt ${attempts}/${maxAttempts}`);
      console.log('Scripts in head:', Array.from(document.head.querySelectorAll('script')).map(s => s.src));
      console.log('Window.ViralLoops:', window.ViralLoops);
      console.log('Available window properties containing "viral":', Object.keys(window).filter(key => key.toLowerCase().includes('viral')));
      
      if (window.ViralLoops) {
        console.log('✅ Viral Loops loaded successfully!');
        console.log('Available methods:', Object.keys(window.ViralLoops));
        resolve(true);
      } else if (attempts >= maxAttempts) {
        console.log('❌ Viral Loops failed to load after maximum attempts');
        resolve(false);
      } else {
        setTimeout(checkLoaded, 1000);
      }
    };
    checkLoaded();
  });
};