import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { theme } from '../../styles/theme';

// Import ring feature images
import R1 from '../../assets/images/ring-features/R1.jpg';
import R2 from '../../assets/images/ring-features/R2.jpg';
import R3 from '../../assets/images/ring-features/R3.jpg';
import R4 from '../../assets/images/ring-features/R4.jpg';
import R5 from '../../assets/images/ring-features/R5.jpg';

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500vh; /* Extended height for scroll space */
`;

const PinnedViewport = styled(motion.div)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  will-change: transform;
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
    color: #FF7640 !important;
    background: none !important;
    -webkit-text-fill-color: #FF7640 !important;
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
  overflow: hidden;
`;

const CardContainer = styled.div`
  position: relative;
  width: 650px; /* Wider to show 2 cards: full + partial */
  height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100vw;
    height: 360px;
    justify-content: center;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100vw;
    height: 340px;
    justify-content: center;
  }
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 300px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 260px;
    height: 360px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 240px;
    height: 340px;
  }
`;

const FeatureCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  background: rgba(26, 26, 26, 0.9);
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
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.95) 0%, 
    rgba(0, 0, 0, 0.7) 60%,
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

const RingFeaturesSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Sequential card animation with proper timing for all 5 cards
  // Each card gets exactly 20% of the scroll range
  // Use different spacing for mobile - increased for better gap
  const cardSpacing = isMobile ? 380 : 350; // Increased spacing on mobile to prevent overlap
  
  // Card 1: Visible at start, slides out
  const card1X = useTransform(scrollYProgress, [0, 0.2], [0, -cardSpacing]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.2], [1, 1, 0]);
  
  // Card 2: Enters as partial, becomes full, exits
  const card2X = useTransform(scrollYProgress, [0, 0.2, 0.4], [cardSpacing, 0, -cardSpacing]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.38, 0.4], [0, 0.7, 1, 1, 0]);
  
  // Card 3: Enters when card 2 is centered
  const card3X = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [cardSpacing, 0, -cardSpacing]);
  const card3Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.58, 0.6], [0, 0.7, 1, 1, 0]);
  
  // Card 4: Enters when card 3 is centered
  const card4X = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [cardSpacing, 0, -cardSpacing]);
  const card4Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.78, 0.8], [0, 0.7, 1, 1, 0]);
  
  // Card 5: Final card, stays visible
  const card5X = useTransform(scrollYProgress, [0.6, 0.8, 1], [cardSpacing, 0, 0]);
  const card5Opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 1], [0, 0.7, 1, 1]);

  const cardData = [
    {
      image: R1,
      title: "Advanced Sleep Tracking",
      description: "Monitor sleep stages with precision",
      x: card1X,
      opacity: card1Opacity
    },
    {
      image: R2,
      title: "Heart Rate Monitoring", 
      description: "24/7 heart rate tracking",
      x: card2X,
      opacity: card2Opacity
    },
    {
      image: R3,
      title: "Stress Management",
      description: "Track and manage stress levels",
      x: card3X,
      opacity: card3Opacity
    },
    {
      image: R4,
      title: "Activity Tracking",
      description: "Automatic workout detection",
      x: card4X,
      opacity: card4Opacity
    },
    {
      image: R5,
      title: "Smart Insights",
      description: "AI-powered recommendations",
      x: card5X,
      opacity: card5Opacity
    }
  ];

  return (
    <SectionContainer ref={containerRef}>
      <PinnedViewport>
        <ContentGrid>
          <TextSection>
            <Title
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="green-text">Your Sleep,</span><br />
              <span className="white-text">Your Way</span>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Experience the most advanced sleep tracking technology, 
              designed to adapt to your unique sleep patterns.
            </Subtitle>
          </TextSection>

          <CardsSection>
            <CardContainer>
              {cardData.map((card, index) => (
                <CardWrapper
                  key={index}
                  style={{
                    x: card.x,
                    opacity: card.opacity,
                    zIndex: 10 + index
                  }}
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
      </PinnedViewport>
    </SectionContainer>
  );
};

export default RingFeaturesSection;