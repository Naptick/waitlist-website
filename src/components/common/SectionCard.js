import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const CardContainer = styled(motion.section)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  margin: ${props => props.$fullHeight ? '0 auto' : '20px auto'};
  max-width: 1400px;
  width: calc(100% - 40px);
  height: ${props => props.$fullHeight ? '100%' : 'auto'};
  padding: 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  ${props => props.$bgImage && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${props.$bgImage});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.4;
      z-index: 1;
      pointer-events: none;
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, ${theme.colors.primary}08 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${theme.colors.secondary}08 0%, transparent 50%);
    pointer-events: none;
    z-index: ${props => props.$bgImage ? '2' : '1'};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 20px auto;
    width: calc(100% - 20px);
    padding: 0;
    border-radius: 20px;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 60px 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 40px 24px;
  }
`;

const SectionCard = ({ children, fullHeight = false, bgImage, ...props }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1]
      }
    }
  };

  return (
    <CardContainer
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      $fullHeight={fullHeight}
      $bgImage={bgImage}
      {...props}
    >
      <CardContent>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default SectionCard;