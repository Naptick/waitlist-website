import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { theme } from "../../styles/theme";
// import SectionCard from '../common/SectionCard'; // Commented out for curtain effect
import AppSectionWrapper from "./AppSectionWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import app images
// import appBg from "../../assets/images/app-section/app-bg1.png";
import appStore from "../../assets/images/app-section/app-store1.png";
// import googlePlay from "../../assets/images/app-section/google-play.png";

gsap.registerPlugin(ScrollTrigger);

// SectionContent removed - using SectionCard instead

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
  max-width: 1400px;
  padding: 0 20px;
  align-items: center;
  z-index: 2;
  margin-left: 0;
  padding-left: 80px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 40px;
    text-align: center;
    margin-left: 0;
    padding-left: 40px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 20px;
    padding-left: 20px;
  }
`;

const TextSection = styled.div`
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;

  .orange-text {
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

const SectionDescription = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 20px;
  line-height: 1.6;
  font-weight: 500;
`;

const LaunchText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  margin-bottom: 40px;
  opacity: 0.8;
  font-weight: 500;
`;

const StoreButtons = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const StoreButton = styled(motion.a)`
  display: inline-block;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    height: 60px;
    width: auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const AppSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const revealRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for phone mockup
  const phoneY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);

  // Card-based reveal effect will be handled by SectionCard

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <div ref={sectionRef} id="the-app">
      <div ref={containerRef}>
        {/* <SectionCard bgImage={appBg}> Commented out for curtain effect */}
        <MainContent>
          <TextSection>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <SectionTitle variants={itemVariants}>
                <span className="white-text">Download</span>
                <br />
                <span className="orange-text">Naptick</span>{" "}
                <span className="orange-text">App</span>
              </SectionTitle>

              <SectionDescription variants={itemVariants}>
                Track onset, recovery, and
                <br />
                sleep quality with Apple Watch.
              </SectionDescription>

              <LaunchText variants={itemVariants}>
                Free for a limited time.
              </LaunchText>

              <StoreButtons variants={itemVariants}>
                <StoreButton
                  href="https://apps.apple.com/in/app/naptick-ai-sleep-coach/id6737825174"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={appStore} alt="Download on App Store" />
                </StoreButton>
                {/* <StoreButton
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={googlePlay} alt="Get it on Google Play" />
                </StoreButton> */}
              </StoreButtons>
            </motion.div>
          </TextSection>
          
          <RightSection>
            {/* Placeholder for future content like app mockup or visual elements */}
          </RightSection>
        </MainContent>
        {/* </SectionCard> Commented out for curtain effect */}
      </div>
    </div>
  );
};

export default AppSection;
