import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VideoContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    object-fit: contain;
  }
`;

const SkipButton = styled(motion.button)`
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    bottom: 30px;
    right: 30px;
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 320px) {
    bottom: 20px;
    right: 20px;
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const VideoIntro = ({ onComplete, isEnding }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // FOR TESTING: Clear session storage to always show video
    sessionStorage.removeItem('hasSeenIntro');
    
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete();
    } else {
      // Show skip button after 2 seconds
      setTimeout(() => setShowSkip(true), 2000);
      
      // Force video to play
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log('Video autoplay failed:', error);
          // If autoplay fails, complete immediately
          handleVideoEnd();
        });
      }
    }
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    // Keep video visible but fade it out slowly
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleSkip = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    // Keep video visible but fade it out slowly
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <VideoContainer
          initial={{ opacity: 1 }}
          animate={{ opacity: isEnding ? 0.3 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            src="https://naptickvideos.s3.ap-south-1.amazonaws.com/Intro-Video1.mp4"
          >
            Your browser does not support the video tag.
          </Video>
          {showSkip && (
            <SkipButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip →
            </SkipButton>
          )}
        </VideoContainer>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro;