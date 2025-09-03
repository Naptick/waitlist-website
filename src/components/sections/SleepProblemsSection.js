import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.section`
  position: relative;
  width: 100%;
  height: 500vh; /* Provide enough height for ScrollTrigger pinning and scrubbing */
  background: #000;
`;

const PinnedSection = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  position: relative;
`;

// Hi testing
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9; /* 70% transparency as requested */
  transform: rotate(180deg);
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
  letter-spacing: 1px;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    white-space: normal;
  }
`;

// Movie credits style scrolling animation - COMMENTED OUT
// const scrollCredits = keyframes`
//   0% {
//     transform: translateY(300px);
//     opacity: 0;
//   }
//   5% {
//     opacity: 1;
//   }
//   40% {
//     opacity: 1;
//   }
//   50% {
//     transform: translateY(-60px);
//     opacity: 0;
//   }
//   100% {
//     transform: translateY(-60px);
//     opacity: 0;
//   }
// `;

const TextContainer = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  max-width: 900px;
  width: 90%;
  height: 100px; /* Fixed height to contain all text elements */
`;

const SequentialText = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.6;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.9);
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0; /* Initially hidden for GSAP animation */

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  z-index: 1;
`;

const SleepProblemsSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const titleRef = useRef(null);
  const textsRef = useRef([]);

  const texts = [
    "Stress and racing thoughts keep the mind wired.",
    "Irregular bedtimes throw off natural rhythms.",
    "Harsh environments — light, noise, air — fight against rest.",
    "Trackers only measure sleep; pills sedate but don't solve.",
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const title = titleRef.current;
    const textElements = textsRef.current;
    const video = videoRef.current;

    if (!section || !pinned || !title || !textElements.length) return;

    // Start video immediately when component loads
    if (video) {
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }

    // Create timeline for scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: pinned,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: true,
        id: "sleep-problems-section",
        onEnter: () => {
          // Ensure video plays when section enters
          if (video && video.paused) {
            video.play().catch((error) => {
              console.log("Video play failed:", error);
            });
          }
        }
      },
    });

    // Initially hide title and all texts
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(textElements, { opacity: 0, y: 20 });

    // Timeline sequence:
    // 1. Show title first
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    // 2. Show each text line sequentially with fade in/out
    textElements.forEach((textEl, index) => {
      // Fade in
      tl.to(textEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, `+=${index === 0 ? 0.5 : 0.2}`) // First text has more delay after title
      
      // Fade out (except for the last one)
      .to(textEl, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        ease: "power2.in"
      }, `+=${1.2}`); // Hold for 1.2 seconds before fading out
    });

    return () => {
      // Cleanup
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [texts]);

  return (
    <SectionContainer ref={sectionRef}>
      <PinnedSection ref={pinnedRef}>
        <VideoBackground 
          ref={videoRef} 
          autoPlay
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="https://naptickvideos.s3.ap-south-1.amazonaws.com/Sleep-Problems.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>

        <OverlayGradient />

        <ContentContainer>
          <Title ref={titleRef}>
            Why We Can't Sleep
          </Title>
        </ContentContainer>

        <TextContainer>
          {texts.map((text, index) => (
            <SequentialText
              key={index}
              ref={(el) => (textsRef.current[index] = el)}
            >
              {text}
            </SequentialText>
          ))}
        </TextContainer>
      </PinnedSection>
    </SectionContainer>
  );
};

export default SleepProblemsSection;
