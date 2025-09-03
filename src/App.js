import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import VideoIntro from './components/VideoIntro/VideoIntro';
// import VideoBackground from './components/VideoBackground/VideoBackground';
import Header from './components/layout/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import NaptickAppPage from './pages/NaptickAppPage/NaptickAppPage';
import SmoothScroll from './components/common/SmoothScroll';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [videoEnding, setVideoEnding] = useState(false);

  useEffect(() => {
    // FOR TESTING: Always show video on load
    // Remove this line in production
    sessionStorage.removeItem('hasSeenIntro');
    
    // Check if user has seen the intro video in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowVideo(false);
      setContentReady(true);
    } else {
      // Don't show content until video is complete
      // Content will only show when handleVideoComplete is called
    }
  }, []);

  const handleVideoComplete = () => {
    setContentReady(true);
    setVideoEnding(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 500); // Small delay for smooth transition
  };

  return (
    <Router>
      <GlobalStyles />
      <ScrollToTop />
      
      {/* Video Intro - Overlaps with content */}
      {showVideo && (
        <VideoIntro 
          onComplete={handleVideoComplete}
          isEnding={videoEnding}
        />
      )}
      
      {/* Video Background - Shows after intro */}
      {/* <VideoBackground isVideoEnded={!showVideo} /> */}
      
      {/* Main Content - Appears while video is ending */}
      {contentReady && (
        <SmoothScroll>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/naptick-app" element={<NaptickAppPage />} />
            <Route path="/blog" element={<div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>Blog Page (Coming Soon)</div>} />
            <Route path="/investors" element={<div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>Investors Page (Coming Soon)</div>} />
          </Routes>
        </SmoothScroll>
      )}
    </Router>
  );
}

export default App;