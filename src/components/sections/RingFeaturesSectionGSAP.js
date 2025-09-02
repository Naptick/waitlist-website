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
`;

const TextSection = styled.div`
  z-index: 2;
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
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 40px;
`;

const CardsSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 900px;
  height: 450px;
  display: flex;
  align-items: center;
  overflow: visible;
  perspective: 1000px;
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
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
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

    // Initial setup: First card on left, second card partially visible on right with gap
    // Card 1 is fully visible, Card 2 shows 20% with gap
    gsap.set(cards[0], {
      x: 0,
      zIndex: 1, // Lower z-index so cards can slide over it
      opacity: 1,
      immediateRender: true,
    });

    gsap.set(cards[1], {
      x: 520, // Position to the right with gap adjusted for 480px wide cards (shows ~20% of card)
      zIndex: 2, // Higher z-index to slide over card 1
      opacity: 1,
      immediateRender: true,
    });

    // Hide remaining cards to the right
    cards.forEach((card, index) => {
      if (index > 1) {
        gsap.set(card, {
          x: 720,
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
      x: 0, // Slide left to cover card 1
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 3 appears from right with gap
      .fromTo(
        cards[2],
        { x: 720, opacity: 0, zIndex: 3 },
        { x: 520, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Card 3 slides left OVER the stack (cards 1 & 2)
    tl.to(cards[2], {
      x: 0, // Slide left to cover the stack
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 4 appears from right with gap
      .fromTo(
        cards[3],
        { x: 720, opacity: 0, zIndex: 4 },
        { x: 520, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Card 4 slides left OVER the stack
    tl.to(cards[3], {
      x: 0, // Slide left to cover the stack
      duration: 1.5,
      ease: "power1.inOut",
    })
      // Card 5 appears from right with gap
      .fromTo(
        cards[4],
        { x: 720, opacity: 0, zIndex: 5 },
        { x: 520, opacity: 1, duration: 1.2, ease: "power1.out" },
        "-=0.8"
      );

    // Final: Card 5 slides left OVER all previous cards
    tl.to(cards[4], {
      x: 0, // Slide left to cover all cards
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
              <span className="white-text">Meet</span>{" "}
              <span className="green-text">Naphome</span>
              <br />
              <span className="white-text"></span>
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
