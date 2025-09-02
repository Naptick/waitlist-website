import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500vh; /* Total height for 5 sections */
`;

const SectionSlide = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.8);
  
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
  
  @media (max-width: 768px) {
    padding: 40px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const AppSectionsSlideshow = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const timelineRef = useRef(null);

  const sections = [
    { Component: AppSection, bg: appBg },
    { Component: AppSection2, bg: appBg2 },
    { Component: AppSection3, bg: appBg3 },
    { Component: AppSection4, bg: appBg4 },
    { Component: AppSection5, bg: appBg5 }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const sectionElements = sectionsRef.current;
    
    if (!container || sectionElements.length === 0) return;

    console.log('🎬 Setting up GSAP slideshow with', sections.length, 'sections');

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: false,
        anticipatePin: 1,
        id: "app-slideshow-main",
      }
    });

    // Initialize all sections - start them below viewport
    sectionElements.forEach((section, index) => {
      // All sections start below viewport initially
      gsap.set(section, {
        y: "100vh",
        opacity: 1,
        zIndex: sections.length - index
      });
    });

    // First section enters from below at start
    tl.to(sectionElements[0], {
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, 0);

    // Create slide transitions - each section gets equal timeline space
    sectionElements.forEach((section, index) => {
      if (index < sections.length - 1) {
        const nextSection = sectionElements[index + 1];
        const startTime = (index + 1) * 1; // Each transition starts 1 unit apart
        
        // Current section moves up, next section slides up from below
        tl.to(section, {
          y: "-100vh",
          duration: 1,
          ease: "power2.inOut"
        }, startTime)
        .to(nextSection, {
          y: 0,
          duration: 1,
          ease: "power2.inOut"
        }, startTime);
      }
    });

    // Hide all sections when slideshow ends
    ScrollTrigger.create({
      trigger: container,
      start: "bottom top",
      onEnter: () => {
        sectionElements.forEach(section => {
          gsap.set(section, { display: 'none' });
        });
      },
      onLeaveBack: () => {
        sectionElements.forEach(section => {
          gsap.set(section, { display: 'flex' });
        });
      },
      id: "app-slideshow-cleanup"
    });

    timelineRef.current = tl;

    return () => {
      console.log('🧹 Cleaning up GSAP slideshow');
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.id && trigger.vars.id.includes("app-slideshow")) {
          trigger.kill(true);
        }
      });
    };
  }, []);

  return (
    <SlideshowContainer ref={containerRef}>
      {sections.map((section, index) => (
        <SectionSlide
          key={index}
          ref={el => sectionsRef.current[index] = el}
          $bgImage={section.bg}
        >
          <ContentWrapper>
            <section.Component />
          </ContentWrapper>
        </SectionSlide>
      ))}
    </SlideshowContainer>
  );
};

export default AppSectionsSlideshow;