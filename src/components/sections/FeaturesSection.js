import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import SectionCard from '../common/SectionCard';

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: ${theme.colors.gradientPurple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all ${theme.transitions.medium};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.colors.gradientPurple};
  border-radius: 16px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

const FeaturesSection = () => {
  const features = [
    {
      icon: "🏆",
      title: "Smart Sensor Technology",
      description: "Advanced sensors track your sleep patterns, heart rate, and recovery metrics with medical-grade precision."
    },
    {
      icon: "⚡",
      title: "Ultra-Long Battery",
      description: "Up to 7 days of continuous tracking on a single charge, so you never miss a night of data."
    },
    {
      icon: "💧",
      title: "Water Resistant",
      description: "IP68 rated for complete water resistance. Wear it in the shower, pool, or during intense workouts."
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your health data stays yours. No subscription required, all processing happens locally on your device."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <SectionCard id="the-ring">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle variants={itemVariants}>
          The Ring
        </SectionTitle>
        <SectionSubtitle variants={itemVariants}>
          Premium sleep technology designed for your lifestyle. Track, analyze, and optimize your recovery.
        </SectionSubtitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </motion.div>
    </SectionCard>
  );
};

export default FeaturesSection;