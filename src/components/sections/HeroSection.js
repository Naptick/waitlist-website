import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import productHeroImage from "../../assets/images/product-hero.png";

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #000000;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
`;

const EarlyBirdBanner = styled(motion.div)`
  background: rgba(124, 58, 237, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(124, 58, 237, 0.3);
  padding: 16px 32px;
  border-radius: 12px;
  margin-bottom: 40px;
  display: inline-block;

  span {
    color: ${theme.colors.primaryLight};
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 12px 24px;
    margin-bottom: 30px;

    span {
      font-size: 0.85rem;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
    padding-top: 80px;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 24px;
  color: ${theme.colors.text};
  line-height: 1.2;

  .gradient-text {
    background: ${theme.colors.gradientPurple};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .green-text {
    color: #ff7640 !important;
    background: none !important;
    -webkit-text-fill-color: #ff7640 !important;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  padding: 16px 32px;
  background: #ff7640;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all ${theme.transitions.medium};
  box-shadow: 0 8px 30px rgba(255, 118, 64, 0.3);

  &:hover {
    background: #e85d2f;
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(255, 118, 64, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 16px 32px;
  background: transparent;
  color: ${theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid ${theme.colors.primary};
  border-radius: 50px;
  cursor: pointer;
  transition: all ${theme.transitions.medium};

  &:hover {
    background: ${theme.colors.primary}11;
    transform: translateY(-2px);
  }
`;

const HeroImage = styled(motion.div)`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImageContainer = styled(motion.div)`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
  }
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  border-radius: 20px;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${theme.colors.gradientPurple};
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(40px);
`;

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    // Set video to last frame when loaded
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.currentTime = 5; // Go to 5 seconds into the video
        setVideoLoaded(true);
      });
    }
  }, []);
  // Header appears first, then title, then subtitle, then buttons, finally product image
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5, // Start after header animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 1.9, // Appears after text content
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <HeroContainer>
      <VideoBackground
        ref={videoRef}
        src="/intro-video.mp4#t=5"
        muted
        playsInline
        style={{ opacity: videoLoaded ? 0.4 : 0 }}
      />
      <HeroContent>
        <HeroText>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <EarlyBirdBanner
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <span>Reserve Your Early Bird Price Today!!</span>
            </EarlyBirdBanner>

            <HeroTitle
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <span className="green-text">Sleep More.</span>
              <br />
              <span className="gradient-text">Stress Less.</span>
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.3,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              Transform your health with intelligent sleep tracking and
              personalized insights. Your journey to better rest starts here.
            </HeroSubtitle>
            <ButtonGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.6,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Preorder Now
              </PrimaryButton>
            </ButtonGroup>
          </motion.div>
        </HeroText>

        <HeroImage>
          <ProductImageContainer
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <ProductImage
              src={productHeroImage}
              alt="Naptick Smart Ring Product"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </ProductImageContainer>
          <FloatingElement
            style={{ top: "10%", right: "10%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, ...floatingAnimation }}
            transition={{ opacity: { delay: 1.5, duration: 1 } }}
          />
          <FloatingElement
            style={{ bottom: "20%", left: "5%", width: "80px", height: "80px" }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.6,
              ...floatingAnimation,
            }}
            transition={{
              opacity: { delay: 1.7, duration: 1 },
              ...floatingAnimation.transition,
              delay: 1,
            }}
          />
          <FloatingElement
            style={{
              top: "50%",
              right: "-10%",
              width: "100px",
              height: "100px",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.6,
              ...floatingAnimation,
            }}
            transition={{
              opacity: { delay: 1.9, duration: 1 },
              ...floatingAnimation.transition,
              delay: 2,
            }}
          />
        </HeroImage>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
