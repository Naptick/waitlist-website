import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const CardContainer = styled.div`
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
      rgba(0, 0, 0, 0.05) 0%, 
      rgba(0, 0, 0, 0.15) 50%,
      rgba(0, 0, 0, 0.25) 100%
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

const StoryCard = ({ bgImage, title, description }) => {
  return (
    <CardContainer>
      <BackgroundImage $bgImage={bgImage} />
      
      <TextContent
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.8
        }}
      >
        <StoryText>
          {title}
        </StoryText>
        {description && (
          <motion.p
            style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: '20px',
              lineHeight: '1.6',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1,
              delay: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {description}
          </motion.p>
        )}
      </TextContent>
    </CardContainer>
  );
};

export default StoryCard;