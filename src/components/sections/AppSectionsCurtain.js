import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppSectionWrapper from './AppSectionWrapper';

// Import all app sections
import AppSection from './AppSection';
import AppSection2 from './AppSection2';
import AppSection3 from './AppSection3';
import AppSection4 from './AppSection4';
import AppSection5 from './AppSection5';

// Import app background images
import appBg from '../../assets/images/app-section/app-bg1.png';
import appBg2 from '../../assets/images/app-section/app-bg2.png';
import appBg3 from '../../assets/images/app-section/app-bg3.png';
import appBg4 from '../../assets/images/app-section/app-bg4.png';
import appBg5 from '../../assets/images/app-section/app-bg5.png';

const CurtainContainer = styled.div`
  position: relative; /* Fix positioning warning */
  width: 100%;
  
  /* Ensure proper stacking order */
  > div:last-child {
    position: relative !important;
    z-index: 1 !important; /* Lower z-index so it doesn't overshadow others */
    transform: none !important;
    display: flex !important;
    min-height: 100vh !important;
  }
`;

const AppSectionsCurtain = () => {
  const sections = [
    { Component: AppSection, bg: appBg },
    { Component: AppSection2, bg: appBg2 },
    { Component: AppSection3, bg: appBg3 },
    { Component: AppSection4, bg: appBg4 },
    { Component: AppSection5, bg: appBg5 }
  ];

  // Global cleanup on component unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTriggers when component unmounts
      try {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.id && trigger.vars.id.includes('section')) {
            trigger.kill(true);
          }
        });
        ScrollTrigger.refresh();
      } catch (error) {
        console.warn('Global ScrollTrigger cleanup error:', error);
      }
    };
  }, []);

  console.log('AppSectionsCurtain rendering with', sections.length, 'sections');

  return (
    <CurtainContainer>
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        console.log(`Rendering section ${index + 1}, isLast: ${isLast}`);
        
        return (
          <AppSectionWrapper
            key={index}
            bgImage={section.bg}
            index={index}
            totalSections={sections.length}
          >
            <section.Component />
          </AppSectionWrapper>
        );
      })}
    </CurtainContainer>
  );
};

export default AppSectionsCurtain;