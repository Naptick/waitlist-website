import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VideoBackgroundContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  filter: blur(2px);
`;

const VideoBackground = ({ isVideoEnded }) => {
  const videoRef = useRef(null);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (isVideoEnded) {
      // Wait a moment then show the background video
      setTimeout(() => {
        setShowBackground(true);
        if (videoRef.current) {
          // Go to last frame
          videoRef.current.currentTime = videoRef.current.duration || 10;
          videoRef.current.pause();
        }
      }, 500);
    }
  }, [isVideoEnded]);

  if (!showBackground) return null;

  return (
    <AnimatePresence>
      <VideoBackgroundContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <BackgroundVideo
          ref={videoRef}
          src={`${process.env.PUBLIC_URL}/intro-video1.mp4`}
          muted
          playsInline
        />
      </VideoBackgroundContainer>
    </AnimatePresence>
  );
};

export default VideoBackground;