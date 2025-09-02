import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Logo = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${theme.colors.gradientPurple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const LoadingRing = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid transparent;
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid transparent;
    border-top: 3px solid ${theme.colors.primaryLight};
    border-radius: 50%;
    opacity: 0.5;
  }
`;

const LoadingText = styled(motion.p)`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  margin-top: 20px;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const LoadingScreen = ({ isVisible }) => {
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const logoVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <LoadingContainer
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          <LogoContainer>
            <Logo
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              NAPTICK
            </Logo>
            <LoadingRing
              variants={ringVariants}
              animate="animate"
            />
            <LoadingText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading
            </LoadingText>
          </LogoContainer>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;