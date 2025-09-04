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
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 300px;
  }
  
  @media (max-width: 430px) {
    height: 250px;
    width: 100%;
    margin: 0;
    justify-content: flex-start;
    padding-left: 20px;
    overflow: hidden;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 900px;
  height: 450px;
  display: flex;
  align-items: center;
  overflow: visible;
  perspective: 1000px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 600px;
    height: 350px;
  }
  
  @media (max-width: 430px) {
    width: 100%;
    height: 250px;
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
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  will-change: transform, z-index;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
  }
  
  @media (max-width: 430px) {
    height: 250px;
    justify-content: flex-start;
  }
`;

const FeatureCard = styled.div`
  width: 480px;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  background: rgba(26, 26, 26, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 320px;
    border-radius: 20px;
  }
  
  @media (max-width: 430px) {
    width: 240px;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    
    &:hover {
      transform: scale(1.01);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    transparent 100%
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 15px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.9rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    line-height: 1.3;
  }
`;

const RingFeaturesSectionGSAP = () => {
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const cardsRef = useRef([]);

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
        // Mobile: Cards with increased spacing and moved further left
        return { 
          startX: -20, // Start 20px left of container edge (even further left)
          partialOffset: 200, // Increased gap - 240px card + 40px gap = better separation
          hiddenOffset: 340 // Hide cards off right edge
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

    return () => {
      // Kill the specific timeline and its ScrollTrigger
      if (tl) {
        tl.kill();
      }
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
