import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// Import storytelling static images
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

const StorytellingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const slideRefs = useRef([]);

  const stories = [
    {
      text: "We're living in a world that never stops.",
      image: story1
    },
    {
      text: "Between endless scrolling, crushing deadlines, and late-night binges,",
      image: story2
    },
    {
      text: "Getting good sleep feels like mission impossible...",
      image: story3
    },
    {
      text: "Yet it's the absolute foundation of our wellbeing.",
      image: story4
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
    <StoryContainer>
      {stories.map((story, index) => (
        <StorySlide 
          key={index}
          ref={el => slideRefs.current[index] = el}
        >
          <BackgroundImage $bgImage={story.image} />
          
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

export default StorytellingSection;