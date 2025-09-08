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
  height: 200vh; /* Reduced height since we're auto-scrolling after text sequence */
  background: #000;
`;

const PinnedSection = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    overflow: visible;
  }
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    object-fit: cover;
    width: 120%;
    height: 120%;
    left: -10%;
    top: -10%;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 30%; /* Title positioned much higher on mobile */
    transform: translate(-50%, 0); /* Don't center vertically, start from top */
  }
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

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    white-space: normal;
    font-size: 1.4rem;
    letter-spacing: 0px;
    padding: 0 20px;
    line-height: 1.2;
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
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  max-width: 900px;
  width: 90%;
  height: 100px; /* Fixed height to contain all text elements */
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 700px;
    width: 85%;
    top: 60%;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 320px;
    width: 90%;
    top: 55%; /* Text positioned much lower with clear gap from title at 30% */
    height: 80px;
    transform: translate(-50%, 0); /* Start from top position, don't center */
  }
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

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    line-height: 1.5;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: 0.3px;
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
  const animationTimeouts = useRef([]);
  const isAnimationRunning = useRef(false);

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

    // Initially hide title and all texts
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(textElements, { opacity: 0, y: 20 });

    // Define animation functions first
    const autoScrollToNextSection = () => {
      // Get the next section after this one
      const nextSection = section.nextElementSibling;
      if (nextSection) {
        // Smooth scroll to next section
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // If no next section, scroll past this section
        const sectionBottom = section.offsetTop + section.offsetHeight;
        window.scrollTo({
          top: sectionBottom,
          behavior: 'smooth'
        });
      }
    };

    const startSequentialAnimation = () => {
      // Clear any existing timeouts and stop previous animation
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current = [];
      
      // Kill any running GSAP animations on texts and title
      gsap.killTweensOf([title, ...textElements]);
      
      // Reset all elements to initial state
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(textElements, { opacity: 0, y: 20 });
      
      isAnimationRunning.current = true;
      console.log("🔄 Starting sleep problems animation sequence");
      
      // 1. Show title first
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });

      // 2. Create looping text animation
      let currentTextIndex = 0;
      let loopCount = 0;
      
      const showNextText = () => {
        if (!isAnimationRunning.current) {
          console.log("🛑 Animation stopped");
          return;
        }
        
        const textEl = textElements[currentTextIndex];
        
        console.log(`📱 Showing text ${currentTextIndex + 1}`);
        
        // Fade in current text
        gsap.to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });

        // Fade out after 2 seconds
        gsap.to(textEl, {
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: "power2.in",
          delay: 2, // Stay for 2 seconds then fade out
          onComplete: () => {
            if (!isAnimationRunning.current) return;
            
            currentTextIndex++;
            
            // Check if we completed one full loop (all 4 texts)
            if (currentTextIndex >= textElements.length) {
              currentTextIndex = 0; // Reset for next loop
              loopCount++;
              console.log(`✅ Completed loop ${loopCount}`);
              
              // Auto-scroll after first complete loop
              if (loopCount === 1) {
                console.log("🚀 First loop completed - auto-scrolling to next section");
                const autoScrollTimeout = setTimeout(() => {
                  if (isAnimationRunning.current) {
                    autoScrollToNextSection();
                  }
                }, 1000); // Wait 1 second after loop completion
                animationTimeouts.current.push(autoScrollTimeout);
                return;
              }
            }
            
            // Continue to next text after 1 second gap
            const nextTextTimeout = setTimeout(() => {
              showNextText();
            }, 1000);
            animationTimeouts.current.push(nextTextTimeout);
          }
        });
      };

      // Start the looping sequence after title appears
      const startTimeout = setTimeout(() => {
        showNextText();
      }, 1500); // Start 1.5 seconds after title
      animationTimeouts.current.push(startTimeout);
    };

    // Create ScrollTrigger to pin the section
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      pin: pinned,
      start: "top top",
      end: "bottom bottom",
      pinSpacing: true,
      id: "sleep-problems-pin",
      onEnter: () => {
        console.log("🎯 Sleep problems section entered - starting animation");
        // Start the sequential animation when entering the section
        startSequentialAnimation();
        
        // Ensure video plays when section enters
        if (video && video.paused) {
          video.play().catch((error) => {
            console.log("Video play failed:", error);
          });
        }
      },
      onEnterBack: () => {
        console.log("🔄 Sleep problems section re-entered - restarting animation");
        // Restart animation when scrolling back to this section
        startSequentialAnimation();
        
        // Ensure video plays when section re-enters
        if (video && video.paused) {
          video.play().catch((error) => {
            console.log("Video play failed:", error);
          });
        }
      },
      onLeave: () => {
        console.log("🚪 Sleep problems section left - stopping animation");
        // Stop animation when leaving section
        isAnimationRunning.current = false;
        animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
        animationTimeouts.current = [];
      },
      onLeaveBack: () => {
        console.log("🚪 Sleep problems section left (back) - stopping animation");
        // Stop animation when leaving section backwards
        isAnimationRunning.current = false;
        animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
        animationTimeouts.current = [];
      }
    });

    return () => {
      // Cleanup
      console.log("🧹 Cleaning up sleep problems section");
      isAnimationRunning.current = false;
      
      // Clear all timeouts
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current = [];
      
      // Kill GSAP animations
      gsap.killTweensOf([title, ...textElements]);
      
      // Kill ScrollTrigger
      if (pinTrigger) {
        pinTrigger.kill();
      }
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
