import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const StackContainer = styled.div`
  position: relative;
  width: 100%;
  /* Height adjusted for 5 cards: Hero + 4 Story cards */
  height: 1000vh;
`;

const CardSection = styled(motion.div)`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  transform-origin: center bottom;
  will-change: transform;
  border-radius: 24px;
  overflow: hidden;
  
  /* Add visual depth with box shadow */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CardStackContainer = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const cards = React.Children.toArray(children);
  
  // Create all transforms at component level (not in functions)
  // Card 1 (Hero) transforms
  const card1Scale = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.95, 0.9]);
  const card1Y = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, -20, -60]);
  const card1RotateX = useTransform(scrollYProgress, [0, 0.15], [0, 2]);
  const card1Opacity = useTransform(scrollYProgress, [0.2, 0.25], [1, 0.8]);

  // Card 2 (Story 1) transforms  
  const card2Scale = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [1, 0.95, 0.9]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, -20, -60]);
  const card2RotateX = useTransform(scrollYProgress, [0.2, 0.35], [0, 2]);
  const card2Opacity = useTransform(scrollYProgress, [0.4, 0.45], [1, 0.8]);

  // Card 3 (Story 2) transforms
  const card3Scale = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [1, 0.95, 0.9]);
  const card3Y = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, -20, -60]);
  const card3RotateX = useTransform(scrollYProgress, [0.4, 0.55], [0, 2]);
  const card3Opacity = useTransform(scrollYProgress, [0.6, 0.65], [1, 0.8]);

  // Card 4 (Story 3) transforms
  const card4Scale = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [1, 0.95, 0.9]);
  const card4Y = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [0, -20, -60]);
  const card4RotateX = useTransform(scrollYProgress, [0.6, 0.75], [0, 2]);
  const card4Opacity = useTransform(scrollYProgress, [0.8, 0.85], [1, 0.8]);

  // Card 5 (Story 4) transforms
  const card5Scale = useTransform(scrollYProgress, [0.8, 0.95, 1], [1, 0.95, 0.9]);
  const card5Y = useTransform(scrollYProgress, [0.8, 0.95, 1], [0, -20, -60]);
  const card5RotateX = useTransform(scrollYProgress, [0.8, 0.95], [0, 2]);
  const card5Opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0.8]);

  // Array of transforms for each card
  const cardTransforms = [
    { scale: card1Scale, y: card1Y, rotateX: card1RotateX, opacity: card1Opacity },
    { scale: card2Scale, y: card2Y, rotateX: card2RotateX, opacity: card2Opacity },
    { scale: card3Scale, y: card3Y, rotateX: card3RotateX, opacity: card3Opacity },
    { scale: card4Scale, y: card4Y, rotateX: card4RotateX, opacity: card4Opacity },
    { scale: card5Scale, y: card5Y, rotateX: card5RotateX, opacity: card5Opacity }
  ];

  return (
    <StackContainer ref={containerRef}>
      {cards.map((child, index) => {
        const transforms = cardTransforms[index] || {
          scale: 1,
          y: 0,
          rotateX: 0,
          opacity: 1
        };
        
        return (
          <CardSection
            key={index}
            style={{
              scale: transforms.scale,
              y: transforms.y,
              rotateX: transforms.rotateX,
              opacity: transforms.opacity,
              zIndex: cards.length - index,
              // Add margin to create visual separation
              marginBottom: index < cards.length - 1 ? '-100vh' : '0'
            }}
          >
            {child}
          </CardSection>
        );
      })}
    </StackContainer>
  );
};

export default CardStackContainer;