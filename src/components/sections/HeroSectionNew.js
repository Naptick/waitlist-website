import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
// import SectionCard from "../common/SectionCard"; // Removed to use theme background
import productHeroImage from "../../assets/images/product-hero3.png";
import heroBgImage from "../../assets/images/hero-bg.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { triggerViralLoopsPopup, checkViralLoopsStatus } from "../../utils/viralLoops";

gsap.registerPlugin(ScrollTrigger);

const HeroWrapper = styled.div`
  padding-top: 100px; // Space for header
  width: 100%;
  position: relative;
  z-index: 10; /* Higher than ring section for reveal effect */
  will-change: transform;

  /* Ensure smooth reveal transition */
  & > div {
    will-change: transform, mask-image;
    backface-visibility: hidden;
    transform3d: 0;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
`;

const EarlyBirdBanner = styled(motion.div)`
  background: #005342;
  border-bottom: 1px solid rgba(0, 83, 66, 0.3);
  padding: 20px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 24px 24px 0 0;

  span {
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;

    span {
      font-size: 0.85rem;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 24px;
  color: ${theme.colors.text};
  line-height: 1.2;

  .white-text {
    color: #ffffff !important;
    background: none !important;
    -webkit-text-fill-color: #ffffff !important;
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
  max-width: 600px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
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
  box-shadow: 0 4px 15px rgba(255, 118, 64, 0.3);

  &:hover {
    background: #e85d2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 118, 64, 0.4);
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

const NaphomeButton = styled(motion.button)`
  padding: 16px 32px;
  background: #ffffff;
  color: #000000;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #ffffff;
  border-radius: 50px;
  cursor: pointer;
  transition: all ${theme.transitions.medium};
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 255, 255, 0.3);
  }
`;

const VideoIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const EarlyAccessText = styled(motion.p)`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 12px;
  text-align: left;
  font-weight: 500;
`;

const VideoModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  background: #000;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: -40px;
    font-size: 1.5rem;
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
    margin-top: 20px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  border-radius: 20px;
`;

// VideoBackground removed - using global theme background instead

const HeroSectionNew = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleNaphomeClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleJoinWaitlist = () => {
    triggerViralLoopsPopup();
  };

  // Initialize Viral Loops widgets
  useEffect(() => {
    checkViralLoopsStatus();
  }, []);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };

    if (showVideoModal) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [showVideoModal]);

  // Video background removed - no video-related effects needed

  // COMMENTED OUT FOR TESTING - Hero Section Reveal Effect
  /*
  useEffect(() => {
    let heroRevealTrigger = null;
    
    // Hero section reveal effect - removed card sliding
    const card = cardRef.current;
    const section = sectionRef.current;
    
    if (card && section) {
      // Only reveal effect, no card movement
      heroRevealTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: false,
        onUpdate: (self) => {
          // Reveal mask effect that reveals the ring section underneath
          const progress = self.progress;
          gsap.set(card, {
            maskImage: `linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,1) ${Math.max(0, 100 - (progress * 150))}%, 
              rgba(0,0,0,0) 100%)`,
            scale: 1 - (progress * 0.1), // More noticeable scale down for reveal
            transformOrigin: "center top"
          });
        }
      });
    }

    return () => {
      if (heroRevealTrigger) {
        heroRevealTrigger.kill();
      }
    };
  }, []);
  */

  return (
    <HeroWrapper ref={sectionRef}>
      <div
        ref={cardRef}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "60px 40px",
          borderRadius: "24px",
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.8) contrast(1.1)",
        }}
      >
        {/* Video background removed - using theme background instead */}

        <HeroContent>
          <HeroText>
            <EarlyBirdBanner
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span> Reserve Your Early Bird Price Today!</span>
            </EarlyBirdBanner>

            <HeroTitle
              initial={{ opacity: 0, x: -100, y: 100 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <span className="green-text">Wind Down.</span>
              <br />
              <span className="white-text">Sleep Better.</span>
            </HeroTitle>

            <HeroSubtitle
              initial={{ opacity: 0, x: -80, y: 80 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              Guided routines for calmer sleep.
              <br />
              Sleep support that feels natural, not forced.
            </HeroSubtitle>

            <ButtonGroup
              initial={{ opacity: 0, x: -60, y: 60 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.1,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <ButtonRow>
                <PrimaryButton 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinWaitlist}
                >
                  Join the Waitlist
                </PrimaryButton>
                <NaphomeButton
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNaphomeClick}
                >
                  <VideoIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </VideoIcon>
                  Naphome in Action
                </NaphomeButton>
              </ButtonRow>
              <EarlyAccessText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.4,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                Early access + up to 50% savings
              </EarlyAccessText>
            </ButtonGroup>
          </HeroText>

          <HeroImage>
            <ProductImageContainer
              as={motion.div}
              initial={{ opacity: 0, x: 100, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 1.4,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <ProductImage
                src={productHeroImage}
                alt="Naptick Smart Ring Product"
              />
            </ProductImageContainer>
          </HeroImage>
        </HeroContent>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <VideoModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
          >
            <VideoContainer onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              <VideoElement
                ref={videoRef}
                controls
                autoPlay
                muted
                loop
                onClick={(e) => e.stopPropagation()}
              >
                <source src="/naptick-full.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </VideoElement>
            </VideoContainer>
          </VideoModal>
        )}
      </AnimatePresence>
    </HeroWrapper>
  );
};

export default HeroSectionNew;
