import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
// import SectionCard from '../common/SectionCard'; // Commented out for curtain effect

// Import app images
import appBg3 from '../../assets/images/app-section/app-bg3.png';
import appProduct2 from '../../assets/images/app-section/app-product2.png';


const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 0 40px;
    text-align: center;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 20px;
    gap: 40px;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
    text-align: center;
  }
`;

const MainTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.1;
  color: #ffffff;
  
  .highlight {
    color: #FF7640;
    display: block;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.3rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 500px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const ProductImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 400px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 300px;
  }
`;

const AppSection3 = () => {
  return (
    <div>
      {/* <SectionCard bgImage={appBg3}> Commented out for curtain effect */}
        <ContentGrid>
        <TextContent
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            duration: 1,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <MainTitle
            initial={{ opacity: 0, x: -80, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find Your
            <span className="highlight">Prime Time</span>
          </MainTitle>
          
          <Description
            initial={{ opacity: 0, x: -60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Understand your body clock and schedule your focus around your natural energy peaks and dips.
          </Description>
        </TextContent>

        <ImageContainer
          initial={{ opacity: 0, x: 120, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <ProductImage 
            src={appProduct2} 
            alt="Leep App Prime Time Feature" 
          />
        </ImageContainer>
        </ContentGrid>
      {/* </SectionCard> Commented out for curtain effect */}
    </div>
  );
};

export default AppSection3;