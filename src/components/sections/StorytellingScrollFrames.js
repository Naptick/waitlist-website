import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// Import all 20 frames directly
import frame001 from '../../assets/images/storytelling/story1-frames/frame-001.jpg';
import frame002 from '../../assets/images/storytelling/story1-frames/frame-002.jpg';
import frame003 from '../../assets/images/storytelling/story1-frames/frame-003.jpg';
import frame004 from '../../assets/images/storytelling/story1-frames/frame-004.jpg';
import frame005 from '../../assets/images/storytelling/story1-frames/frame-005.jpg';
import frame006 from '../../assets/images/storytelling/story1-frames/frame-006.jpg';
import frame007 from '../../assets/images/storytelling/story1-frames/frame-007.jpg';
import frame008 from '../../assets/images/storytelling/story1-frames/frame-008.jpg';
import frame009 from '../../assets/images/storytelling/story1-frames/frame-009.jpg';
import frame010 from '../../assets/images/storytelling/story1-frames/frame-010.jpg';
import frame011 from '../../assets/images/storytelling/story1-frames/frame-011.jpg';
import frame012 from '../../assets/images/storytelling/story1-frames/frame-012.jpg';
import frame013 from '../../assets/images/storytelling/story1-frames/frame-013.jpg';
import frame014 from '../../assets/images/storytelling/story1-frames/frame-014.jpg';
import frame015 from '../../assets/images/storytelling/story1-frames/frame-015.jpg';
import frame016 from '../../assets/images/storytelling/story1-frames/frame-016.jpg';
import frame017 from '../../assets/images/storytelling/story1-frames/frame-017.jpg';
import frame018 from '../../assets/images/storytelling/story1-frames/frame-018.jpg';
import frame019 from '../../assets/images/storytelling/story1-frames/frame-019.jpg';
import frame020 from '../../assets/images/storytelling/story1-frames/frame-020.jpg';

// Import static images for other slides
import story2 from '../../assets/images/storytelling/story-2.jpg';
import story3 from '../../assets/images/storytelling/story-3.jpg';
import story4 from '../../assets/images/storytelling/story-4.jpg';

// Create frames array
const frames = [
  frame001, frame002, frame003, frame004, frame005,
  frame006, frame007, frame008, frame009, frame010,
  frame011, frame012, frame013, frame014, frame015,
  frame016, frame017, frame018, frame019, frame020
];

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

const FrameContainer = styled.div`
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
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 2;
  }
`;

const FrameImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StaticImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 2;
  }
`;

const TextContent = styled(motion.div)`
  position: relative;
  z-index: 3;
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

// Debug info component
const DebugInfo = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 9999;
  font-family: monospace;
`;

const StorytellingScrollFrames = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showDebug, setShowDebug] = useState(true); // Toggle this to false to hide debug
  
  const firstSlideRef = useRef(null);
  const slideRefs = useRef([]);

  // Stories configuration
  const stories = [
    {
      text: "We're living in a world that never stops.",
      type: 'frames'
    },
    {
      text: "Between endless scrolling, crushing deadlines, and late-night binges,",
      type: 'static',
      image: story2
    },
    {
      text: "Getting good sleep feels like mission impossible...",
      type: 'static',
      image: story3
    },
    {
      text: "Yet it's the absolute foundation of our wellbeing.",
      type: 'static',
      image: story4
    }
  ];

  // Handle scroll for frame animation - ONLY for first slide
  useEffect(() => {
    const handleScroll = () => {
      if (!firstSlideRef.current) return;
      
      const rect = firstSlideRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how much the slide has been scrolled
      let progress = 0;
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // Slide is filling the viewport - calculate progress
        progress = Math.abs(rect.top) / (rect.height - windowHeight);
      } else if (rect.top > 0 && rect.top < windowHeight) {
        // Slide is entering from bottom
        progress = 0;
      } else if (rect.bottom > 0 && rect.bottom < windowHeight) {
        // Slide is exiting from top
        progress = 1;
      }
      
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      // Map progress to frame index (0-19 for array indexing)
      const frameIndex = Math.floor(progress * (frames.length - 1));
      setCurrentFrame(Math.min(frameIndex, frames.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle slide visibility for text animation
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
          threshold: [0.5],
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
    <>
      {showDebug && (
        <DebugInfo>
          <div>Frame: {currentFrame + 1}/20</div>
          <div>Progress: {(scrollProgress * 100).toFixed(1)}%</div>
          <div>Slide: {currentSlide + 1}</div>
        </DebugInfo>
      )}
      
      <StoryContainer>
        {stories.map((story, index) => (
          <StorySlide 
            key={index}
            ref={el => {
              slideRefs.current[index] = el;
              if (index === 0) firstSlideRef.current = el;
            }}
          >
            {story.type === 'frames' ? (
              <FrameContainer>
                <FrameImage 
                  src={frames[currentFrame]} 
                  alt={`Frame ${currentFrame + 1}`}
                />
              </FrameContainer>
            ) : (
              <StaticImage $bgImage={story.image} />
            )}
            
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
    </>
  );
};

export default StorytellingScrollFrames;