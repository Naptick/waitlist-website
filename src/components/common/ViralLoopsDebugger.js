import React, { useEffect } from 'react';

const ViralLoopsDebugger = () => {
  useEffect(() => {
    const debugScript = () => {
      console.log('=== VIRAL LOOPS DEBUG INFO ===');
      console.log('1. Script loaded:', !!document.querySelector('#viral-loops-loader'));
      console.log('2. window.ViralLoops exists:', !!window.ViralLoops);
      console.log('3. window.ViralLoops methods:', window.ViralLoops ? Object.keys(window.ViralLoops) : 'N/A');
      console.log('4. Form widgets found:', document.querySelectorAll('form-widget').length);
      console.log('5. Popup widgets found:', document.querySelectorAll('form-widget[mode="popup"]').length);
      console.log('6. All scripts:', Array.from(document.querySelectorAll('script')).map(s => ({ src: s.src, id: s.id })));
      console.log('7. Widget elements:', Array.from(document.querySelectorAll('form-widget')));
      console.log('================================');
    };

    // Debug immediately
    debugScript();

    // Debug after delays to see loading progress
    setTimeout(debugScript, 1000);
    setTimeout(debugScript, 3000);
    setTimeout(debugScript, 5000);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <div>Viral Loops Debug: Check console for details</div>
      <div>Script: {document.querySelector('#viral-loops-loader') ? '✅' : '❌'}</div>
      <div>API: {window.ViralLoops ? '✅' : '❌'}</div>
      <div>Widgets: {document.querySelectorAll('form-widget').length}</div>
    </div>
  );
};

export default ViralLoopsDebugger;