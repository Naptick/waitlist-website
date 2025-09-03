import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const VideoSectionContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 80%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  background: #000;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
`;

const SectionTitle = styled.h2`
  position: absolute;
  top: 60px;
  right: 60px;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  z-index: 10;
  margin: 0;
  text-align: left;
  
  .white-text {
    color: #ffffff !important;
    background: none !important;
    -webkit-text-fill-color: #ffffff !important;
  }
  
  .orange-text {
    color: #FF7640 !important;
    background: none !important;
    -webkit-text-fill-color: #FF7640 !important;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    top: 40px;
    right: 40px;
    font-size: 2.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 30px;
    right: 20px;
    font-size: 2rem;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.1) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
  z-index: 1;
`;

const InsideNaphomeVideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasStarted) {
          const video = videoRef.current;
          if (video) {
            // Set video to start from beginning and play
            video.currentTime = 0;
            video.play().then(() => {
              setHasStarted(true);
            }).catch(error => {
              console.log('Video autoplay failed:', error);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasStarted]);

  // 5-second loop - reset video to beginning after 5 seconds
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= 5) {
      // Reset to beginning after 5 seconds to create loop
      video.currentTime = 0;
    }
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (video) {
      // Ensure video starts from beginning
      video.currentTime = 0;
    }
  };

  return (
    <VideoSectionContainer ref={sectionRef}>
      <SectionTitle>
        <span className="white-text">Inside</span>
        <br />
        <span className="orange-text">Naphome</span>
      </SectionTitle>
      
      <VideoWrapper>
        <VideoElement
          ref={videoRef}
          muted
          playsInline
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src="https://naptickvideos.s3.ap-south-1.amazonaws.com/inside-naphome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoElement>
        
        <VideoOverlay />
      </VideoWrapper>
    </VideoSectionContainer>
  );
};

export default InsideNaphomeVideoSection;