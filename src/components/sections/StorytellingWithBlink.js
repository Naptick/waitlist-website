import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// Import storytelling images
import story1 from '../../assets/images/storytelling/story-1.jpg';
import story2 from '../../assets/images/storytelling/story-2.jpg';
import story3 from '../../assets/images/storytelling/story-3.jpg';
import story4 from '../../assets/images/storytelling/story-4.jpg';

const StoryContainer = styled.section`
  position: relative;
  width: 100%;
`;

const StorySlide = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
`;

const MediaWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.2) 0%, 
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 2;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.05);
  z-index: 1;
`;

// Blinking animation keyframes
const blinkAnimation = keyframes`
  0%, 45%, 55%, 100% { 
    opacity: 0;
  }
  50% { 
    opacity: 1;
  }
`;

// Eyelid overlay for blinking effect
const EyelidOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: #000;
    width: 40px;
    height: 15px;
    border-radius: 50%;
    opacity: 0;
    animation: ${blinkAnimation} 4s infinite;
  }
  
  /* Adjust these positions based on where the eyes are in your image */
  &::before {
    /* Left eye position - adjust these values */
    top: 35%;
    left: 42%;
    transform: rotate(-5deg);
  }
  
  &::after {
    /* Right eye position - adjust these values */
    top: 35%;
    left: 54%;
    transform: rotate(5deg);
  }
`;

// Alternative: Simple fade blink for the entire image
const BlinkFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  animation: ${keyframes`
    0% { opacity: 0; }
    48% { opacity: 0; }
    50% { opacity: 0.8; }
    52% { opacity: 0; }
    98% { opacity: 0; }
    99% { opacity: 0.8; }
    100% { opacity: 0; }
  `} 2.5s infinite;
`;

const TextContent = styled(motion.div)`
  position: relative;
  z-index: 4;
  text-align: center;
  padding: 0 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const StoryText = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
  letter-spacing: -0.02em;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(1.3rem, 3.5vw, 2rem);
  }
`;

const StorytellingWithBlink = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const slideRefs = useRef([]);

  const stories = [
    {
      text: "We're living in a world that never stops.",
      media: story1,
      hasBlinkEffect: true // Enable blink for first slide
    },
    {
      text: "Between endless scrolling, crushing deadlines, and late-night binges,",
      media: story2,
      hasBlinkEffect: false
    },
    {
      text: "Getting good sleep feels like mission impossible...",
      media: story3,
      hasBlinkEffect: false
    },
    {
      text: "Yet it's the absolute foundation of our wellbeing.",
      media: story4,
      hasBlinkEffect: false
    }
  ];

  useEffect(() => {
    const observers = [];
    
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentSlide(index);
              setTextVisible(false);
              setTimeout(() => {
                setTextVisible(true);
              }, 800);
            }
          });
        },
        {
          threshold: [0.5, 0.75],
          rootMargin: '0px'
        }
      );
      
      observer.observe(slide);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <StoryContainer>
      {stories.map((story, index) => (
        <StorySlide 
          key={index}
          ref={el => slideRefs.current[index] = el}
        >
          <MediaWrapper>
            <BackgroundImage $bgImage={story.media} />
            
            {/* Add blink effect only to first slide */}
            {story.hasBlinkEffect && currentSlide === index && (
              <>
                <BlinkFade />
                {/* Debug indicator - remove this after confirming it works */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  color: 'red',
                  fontSize: '20px',
                  zIndex: 10,
                  background: 'white',
                  padding: '10px'
                }}>
                  BLINK EFFECT ACTIVE
                </div>
              </>
            )}
          </MediaWrapper>
          
          <TextContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: currentSlide === index && textVisible ? 1 : 0,
              y: currentSlide === index && textVisible ? 0 : 30
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <StoryText>
              {story.text}
            </StoryText>
          </TextContent>
        </StorySlide>
      ))}
    </StoryContainer>
  );
};

export default StorytellingWithBlink;