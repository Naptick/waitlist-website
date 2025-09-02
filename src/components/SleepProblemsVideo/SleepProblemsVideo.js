import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  overflow: hidden;
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 100px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

// Movie credits style scrolling animation
const scrollCredits = keyframes`
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const CreditsContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${scrollCredits} 12s linear;
  animation-delay: ${props => props.$delay}s;
  padding: 0 20px;
`;

const CreditText = styled.p`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: #ffffff;
  text-align: center;
  margin: 60px 0;
  max-width: 900px;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  font-weight: 300;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    margin: 40px 0;
    font-size: 1.3rem;
  }
`;

const FadeOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  pointer-events: none;
`;

const SleepProblemsVideo = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const credits = [
    "Stress and racing thoughts keep the mind wired.",
    "Irregular bedtimes throw off natural rhythms.",
    "Harsh environments — light, noise, air — fight against rest.",
    "Trackers only measure sleep; pills sedate but don't solve."
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });

      // Timeline:
      // 0-2s: Video plays alone
      // 2s: Title appears
      // 4s: Credits start scrolling
      // Video ends: Fade out and complete

      setTimeout(() => {
        setShowTitle(true);
      }, 2000);

      setTimeout(() => {
        setShowCredits(true);
      }, 4000);

      const handleVideoEnd = () => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      };

      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [onComplete]);

  return (
    <VideoContainer>
      <Video
        ref={videoRef}
        autoPlay
        muted
        playsInline
      >
        <source src="/sleep-problems.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Video>

      <TextOverlay>
        <AnimatePresence>
          {showTitle && (
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Why We Can't Sleep
            </Title>
          )}
        </AnimatePresence>

        {showCredits && (
          <CreditsContainer $delay={0}>
            {credits.map((text, index) => (
              <CreditText key={index}>
                {text}
              </CreditText>
            ))}
          </CreditsContainer>
        )}
      </TextOverlay>

      <AnimatePresence>
        {isExiting && (
          <FadeOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </VideoContainer>
  );
};

export default SleepProblemsVideo;