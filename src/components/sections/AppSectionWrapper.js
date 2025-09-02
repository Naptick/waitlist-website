import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(26, 26, 26);
  position: relative;
  
  /* Background image */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.$bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
    z-index: -1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 40px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const AppSectionWrapper = React.memo(({ children, bgImage, index, totalSections }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const isLast = index === totalSections - 1;
  const hasInitialized = useRef(false);

  const setupScrollTrigger = useCallback(() => {
    const section = sectionRef.current;
    
    if (!section || hasInitialized.current) return;
    
    console.log(`🔧 AppSection${index + 1} initializing. IsLast: ${isLast}`);
    
    // Don't apply curtain effect to the last section
    if (isLast) {
      console.log(`✅ AppSection${index + 1} is LAST - no curtain`);
      gsap.set(section, {
        position: 'relative',
        zIndex: 1, // Lower z-index so it doesn't cover other sections
        opacity: 1,
        display: 'flex'
      });
      hasInitialized.current = true;
      return;
    }

    console.log(`🎬 Setting up curtain for AppSection${index + 1}`);

    // Simple, stable curtain effect
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100vh",
      pin: true,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1,
      id: `app-section-${index + 1}`,
    });

    triggerRef.current = trigger;
    hasInitialized.current = true;
    
  }, [index, isLast]);

  useEffect(() => {
    // Delay initialization to prevent race conditions
    const timer = setTimeout(setupScrollTrigger, 100);
    
    return () => {
      clearTimeout(timer);
      if (triggerRef.current && hasInitialized.current) {
        console.log(`🧹 Cleaning up AppSection${index + 1}`);
        try {
          triggerRef.current.kill(true);
          triggerRef.current = null;
          hasInitialized.current = false;
        } catch (error) {
          console.warn(`ScrollTrigger cleanup error for section ${index + 1}:`, error);
        }
      }
    };
  }, []); // Empty dependency array to prevent re-runs

  return (
    <SectionWrapper 
      ref={sectionRef} 
      $bgImage={bgImage}
      style={{ zIndex: totalSections - index }}
    >
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </SectionWrapper>
  );
});

export default AppSectionWrapper;