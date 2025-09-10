import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import ring feature images
import R1 from "../../assets/images/ring-features/R1.png";
import R2 from "../../assets/images/ring-features/R2.png";
import R3 from "../../assets/images/ring-features/R3.png";
import R4 from "../../assets/images/ring-features/R4.png";
import R5 from "../../assets/images/ring-features/R5.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500vh; /* Provide enough height for ScrollTrigger pinning and scrubbing */
  z-index: 1;
`;

const PinnedSection = styled.div`
  width: 100%;
  height: 100vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
  max-width: 1400px;
  padding: 0 40px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    padding: 0 20px;
  }
`;

const TextSection = styled.div`
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    text-align: left;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 30px;

  .green-text {
    color: #ff7640 !important;
    background: none !important;
    -webkit-text-fill-color: #ff7640 !important;
  }

  .white-text {
    color: #ffffff !important;
    background: none !important;
    -webkit-text-fill-color: #ffffff !important;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 16px;
    text-align: left;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 40px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 24px;
    text-align: left;
    padding-right: 10px;
    line-height: 1.4;
  }
`;

const CardsSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 380px;
  }
  
  @media (max-width: 430px) {
    height: 280px;
    width: 100%;
    margin: 0;
    justify-content: flex-start;
    padding-left: 20px;
    overflow: hidden;
    align-items: flex-start;
    padding-top: 0;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 900px;
  height: 550px;
  display: flex;
  align-items: center;
  overflow: visible;
  perspective: 1000px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 600px;
    height: 420px;
  }
  
  @media (max-width: 430px) {
    width: 100%;
    height: 280px;
    margin: 0;
    position: relative;
    padding-left: 0;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  will-change: transform, z-index;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 420px;
  }
  
  @media (max-width: 430px) {
    height: 280px;
    justify-content: flex-start;
  }
`;

const FeatureCard = styled.div`
  width: 480px;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: transform 0.3s ease;
  display: flex !important;
  flex-direction: column !important;

  /* Force consistent layout for all cards including card 2 */
  & img {
    height: 85% !important;
  }
  
  & > div:last-child {
    height: 15% !important;
    position: relative !important;
    background: black !important;
  }

  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 320px;
    border-radius: 20px;
  }
  
  @media (max-width: 430px) {
    width: 280px;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    
    /* Specific styling for card 2 on mobile */
    &:nth-child(2) img {
      height: 75% !important;
    }
    
    &:nth-child(2) > div:last-child {
      height: 25% !important;
    }
    
    &:hover {
      transform: scale(1.01);
    }
  }
`;

const CardImage = styled.img`
  width: 100% !important;
  height: 85% !important;
  object-fit: cover !important;
  border-radius: 24px 24px 0 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: 20px 20px 0 0;
  }
  
  @media (max-width: 430px) {
    border-radius: 16px 16px 0 0;
  }
`;

const CardContent = styled.div`
  height: 15% !important;
  padding: 4px 16px 6px 16px !important;
  background: black !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-end !important;
  position: relative !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 3px 12px 5px 12px !important;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2px 10px 4px 10px !important;
  }
  
  @media (max-width: 430px) {
    /* More padding for card 2 since it has 25% height */
    .card-wrapper:nth-child(2) & {
      padding: 6px 10px 8px 10px !important;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  text-shadow: none;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.0rem;
    margin-bottom: 4px;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
  text-shadow: none;
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.85rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;

const RingFeaturesSectionGSAP = () => {
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const cardsRef = useRef([]);
  const autoSequenceRef = useRef(null);
  const userScrollDetectedRef = useRef(false);
  const autoSequenceTimeouts = useRef([]);

  const cardData = [
    {
      image: R1,
      title: "Guided Routines",
      description: "Calming light fades, Soothing soundscapes",
    },
    {
      image: R2,
      title: "Smart Environment Sensing",
      description: "Temperature, Humidity,CO₂, VOCs, PM 2.5, Light",
    },
    {
      image: R3,
      title: "Wearable Sync",
      description: "Apple Health, Oura, Whoop, Fitbit etc.",
    },
    {
      image: R4,
      title: "AI Sleep Coach",
      description: "Voice to Voice feature",
    },
    {
      image: R5,
      title: "Phone-Away Mode",
      description: "Routines lock your social media apps",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const cards = cardsRef.current;

    if (!section || !pinned || !cards.length) return;

    // Create timeline for card animations with enhanced reveal integration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: pinned,
        start: "top top",
        end: "bottom bottom", // Use the full height of the section
        scrub: 2, // Increased scrub for smoother transitions
        anticipatePin: 1,
        pinSpacing: true,
        id: "ring-section",
        refreshPriority: 1, // Higher priority for proper pinning
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    // Get responsive card positioning values
    const getCardPositions = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 430) { // Covers all mobile sizes including your 379px
        // Mobile: Cards with proper spacing to prevent overlap
        return { 
          startX: 0, // Center the first card
          partialOffset: 320, // 280px card + 40px gap = no overlap  
          hiddenOffset: 400 // Hide cards off right edge
        };
      } else if (screenWidth <= 768) {
        // Tablet: Medium gaps
        return { 
          startX: 0,
          partialOffset: 350, 
          hiddenOffset: 450 
        };
      } else {
        // Desktop: Original values
        return { 
          startX: 0,
          partialOffset: 520, 
          hiddenOffset: 720 
        };
      }
    };

    const { startX = 0, partialOffset, hiddenOffset } = getCardPositions();

    // Initial setup: First card positioned from startX, second card partially visible
    gsap.set(cards[0], {
      x: startX,
      zIndex: 1, // Lower z-index so cards can slide over it
      opacity: 1,
      immediateRender: true,
    });

    gsap.set(cards[1], {
      x: startX + partialOffset, // Responsive positioning from start point
      zIndex: 2, // Higher z-index to slide over card 1
      opacity: 1,
      immediateRender: true,
    });

    // Hide remaining cards to the right
    cards.forEach((card, index) => {
      if (index > 1) {
        gsap.set(card, {
          x: startX + hiddenOffset,
          zIndex: index + 1, // Progressive z-index
          opacity: 0,
          immediateRender: true,
        });
      }
    });

    // Force immediate render
    gsap.ticker.add(() => {}, true);

    // Card 2 slides left OVER Card 1 (higher z-index ensures it covers card 1)
    tl.to(cards[1], {
      x: startX, // Slide left to cover card 1
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 3 appears from right with gap
      .fromTo(
        cards[2],
        { x: startX + hiddenOffset, opacity: 0, zIndex: 3 },
        { x: startX + partialOffset, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Card 3 slides left OVER the stack (cards 1 & 2)
    tl.to(cards[2], {
      x: startX, // Slide left to cover the stack
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 4 appears from right with gap
      .fromTo(
        cards[3],
        { x: startX + hiddenOffset, opacity: 0, zIndex: 4 },
        { x: startX + partialOffset, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Card 4 slides left OVER the stack
    tl.to(cards[3], {
      x: startX, // Slide left to cover the stack
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 5 appears from right with gap
      .fromTo(
        cards[4],
        { x: startX + hiddenOffset, opacity: 0, zIndex: 5 },
        { x: startX + partialOffset, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Final: Card 5 slides left OVER all previous cards
    tl.to(cards[4], {
      x: startX, // Slide left to cover all cards
      duration: 1.5,
      ease: "power1.inOut",
    });

    // REVERSE AUTO SEQUENCE - for scrolling backwards
    const startReverseAutoSequence = () => {
      console.log("🔄 Starting REVERSE card sequence...");
      
      // Clear any existing timeouts
      autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
      autoSequenceTimeouts.current = [];
      
      // Start at the END with Card 5 visible
      gsap.set(tl, { progress: 1 });
      
      console.log("✅ Ring section reverse state: Card 5 visible");

      // Schedule reverse card transitions
      const scheduleReverseCardTransition = (cardNum) => {
        if (cardNum < 3) {
          // After Card 3, auto-scroll back to sleep-problems section
          const autoScrollTimeout = setTimeout(() => {
            if (!userScrollDetectedRef.current) {
              console.log("🚀 Auto-scrolling back to sleep-problems section...");
              const sleepProblemsSection = section.previousElementSibling;
              if (sleepProblemsSection) {
                sleepProblemsSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }
          }, 3000); // Card 3 stays for 3 seconds before scrolling
          autoSequenceTimeouts.current.push(autoScrollTimeout);
          return;
        }

        // Calculate target progress for going backwards
        const targetProgress = (cardNum - 1) * 0.25; // 0.75 for card 4, 0.5 for card 3
        
        // Wait time before transition (3 seconds display + 1 second gap)
        const waitTime = cardNum === 5 ? 3000 : 4000; // Card 5 only waits 3s, others wait 4s
        
        const transitionTimeout = setTimeout(() => {
          if (!userScrollDetectedRef.current) {
            console.log(`📱 Reverse transition: Card ${cardNum - 1} sliding back`);
            
            // Animate backwards to show previous card
            gsap.to(tl, {
              progress: targetProgress,
              duration: 1.5, // Match the original timeline duration
              ease: "power1.inOut", // Match the original easing
              onComplete: () => {
                // Schedule previous card
                scheduleReverseCardTransition(cardNum - 1);
              }
            });
          }
        }, waitTime);
        
        autoSequenceTimeouts.current.push(transitionTimeout);
      };
      
      // Start with Card 5 (going backwards to Card 4)
      scheduleReverseCardTransition(5);
    };

    // AUTO SEQUENCE FUNCTIONALITY - runs alongside scroll-triggered functionality
    const startAutoSequence = () => {
      console.log("🔄 Starting automatic card sequence...");
      
      // Clear any existing timeouts
      autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
      autoSequenceTimeouts.current = [];
      
      // Start at the beginning with Card 1 + partial Card 2 visible
      gsap.set(tl, { progress: 0 });
      
      console.log("✅ Ring section initial state: Card 1 + partial Card 2 visible");

      // Card 1 stays for 3 seconds, then start transitions
      let currentProgress = 0;
      
      // Calculate the timeline duration and sections
      const totalDuration = tl.duration();
      const progressPerTransition = 1 / 4; // 4 transitions (card 2, 3, 4, 5)
      
      // Schedule Card transitions with exact timeline matching
      const scheduleCardTransition = (cardNum) => {
        if (cardNum > 5) {
          // All cards shown, auto-scroll after 3 seconds
          const autoScrollTimeout = setTimeout(() => {
            if (!userScrollDetectedRef.current) {
              console.log("🚀 Auto-scrolling to next section...");
              autoScrollToNextSection();
            }
          }, 3000);
          autoSequenceTimeouts.current.push(autoScrollTimeout);
          return;
        }

        // Calculate target progress for this card
        const targetProgress = (cardNum - 1) * progressPerTransition;
        
        // Wait time before transition (3 seconds display + 1 second gap)
        const waitTime = cardNum === 2 ? 3000 : 4000; // First card only waits 3s, others wait 4s (3s + 1s gap)
        
        const transitionTimeout = setTimeout(() => {
          if (!userScrollDetectedRef.current) {
            console.log(`📱 Auto-transition: Card ${cardNum} sliding to front`);
            
            // Animate to the exact timeline position for this card
            gsap.to(tl, {
              progress: targetProgress,
              duration: 1.5, // Match the original timeline duration
              ease: "power1.inOut", // Match the original easing
              onComplete: () => {
                // Schedule next card
                scheduleCardTransition(cardNum + 1);
              }
            });
          }
        }, waitTime);
        
        autoSequenceTimeouts.current.push(transitionTimeout);
      };
      
      // Start with Card 2 (Card 1 is already visible)
      scheduleCardTransition(2);
    };

    // Auto-scroll function to next section
    const autoScrollToNextSection = () => {
      console.log("🚀 Auto-scrolling to next section...");
      const nextSection = section.nextElementSibling;
      if (nextSection) {
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

    // Detect user scroll to pause auto sequence
    const handleScroll = () => {
      userScrollDetectedRef.current = true;
      console.log("👆 User scroll detected - pausing auto sequence");
      // Clear all timeouts when user scrolls
      autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
      autoSequenceTimeouts.current = [];
    };

    // Create a single ScrollTrigger that handles both directions
    const autoSequenceTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 90%", // Trigger earlier to catch both directions
      end: "bottom 10%",
      onEnter: () => {
        // Entering from above (scrolling down from sleep-problems)
        userScrollDetectedRef.current = false;
        console.log("🎯 Section entered from ABOVE - starting FORWARD sequence");
        startAutoSequence();
        // Listen for user scroll
        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('touchmove', handleScroll, { passive: true });
      },
      onLeave: () => {
        // Leaving section (scrolling down to inside-naphome)
        console.log("🚪 Section left downwards - cleaning up");
        userScrollDetectedRef.current = true;
        autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
        autoSequenceTimeouts.current = [];
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
      },
      onEnterBack: () => {
        // Entering from below (scrolling up from inside-naphome)
        userScrollDetectedRef.current = false;
        console.log("🔄 Section entered from BELOW - starting REVERSE sequence");
        startReverseAutoSequence();
        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('touchmove', handleScroll, { passive: true });
      },
      onLeaveBack: () => {
        // Leaving section (scrolling up to sleep-problems)
        console.log("🚪 Section left upwards - cleaning up");
        userScrollDetectedRef.current = true;
        autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
        autoSequenceTimeouts.current = [];
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
      }
    });

    // Store reference for cleanup
    autoSequenceRef.current = autoSequenceTrigger;

    return () => {
      // Kill the specific timeline and its ScrollTrigger
      if (tl) {
        tl.kill();
      }
      // Kill auto sequence trigger
      if (autoSequenceRef.current) {
        autoSequenceRef.current.kill();
      }
      // Clear all auto sequence timeouts
      autoSequenceTimeouts.current.forEach(timeout => clearTimeout(timeout));
      autoSequenceTimeouts.current = [];
      // Clean up scroll event listeners
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      // Clean up any ScrollTriggers created by this component
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <SectionContainer ref={sectionRef} id="naphome">
      <PinnedSection ref={pinnedRef}>
        <ContentGrid>
          <TextSection>
            <Title
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="white-text">Meet</span>
              <br />
              <span className="green-text">Naphome</span>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Nap-Home is your bedside companion that combines light, sound,
              sensors, and AI to help you relax, drift off naturally, and wake
              refreshed
            </Subtitle>
          </TextSection>

          <CardsSection>
            <CardContainer>
              {cardData.map((card, index) => (
                <CardWrapper
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <FeatureCard>
                    <CardImage src={card.image} alt={card.title} />
                    <CardContent>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                  </FeatureCard>
                </CardWrapper>
              ))}
            </CardContainer>
          </CardsSection>
        </ContentGrid>
      </PinnedSection>
    </SectionContainer>
  );
};

export default RingFeaturesSectionGSAP;
