import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";

const SectionContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9; /* 70% transparency as requested */
  transform: rotate(180deg);
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
  letter-spacing: 1px;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    white-space: normal;
  }
`;

// Movie credits style scrolling animation - COMMENTED OUT
// const scrollCredits = keyframes`
//   0% {
//     transform: translateY(300px);
//     opacity: 0;
//   }
//   5% {
//     opacity: 1;
//   }
//   40% {
//     opacity: 1;
//   }
//   50% {
//     transform: translateY(-60px);
//     opacity: 0;
//   }
//   100% {
//     transform: translateY(-60px);
//     opacity: 0;
//   }
// `;

const TextContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  max-width: 900px;
  width: 90%;
`;

const SequentialText = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: #ffffff;
  text-align: center;
  margin: 0;
  line-height: 1.6;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.9);
  font-weight: 300;
  letter-spacing: 0.5px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  z-index: 1;
`;

const SleepProblemsSection = () => {
  const videoRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(-1);
  const sectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const texts = [
    "Stress and racing thoughts keep the mind wired.",
    "Irregular bedtimes throw off natural rhythms.",
    "Harsh environments — light, noise, air — fight against rest.",
    "Trackers only measure sleep; pills sedate but don't solve.",
  ];

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          const video = videoRef.current;
          if (video) {
            video.play().catch((error) => {
              console.log("Video autoplay failed:", error);
            });

            setHasPlayed(true);

            // Timeline for animations
            setTimeout(() => {
              setShowTitle(true);
            }, 500);

            // Start sequential text animation after title
            setTimeout(() => {
              startTextSequence();
            }, 2500);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed, texts]);

  const startTextSequence = () => {
    let index = 0;

    const showNextText = () => {
      if (index < texts.length) {
        setCurrentTextIndex(index);

        // Show text for 3 seconds, then hide it
        setTimeout(() => {
          setCurrentTextIndex(-1);

          // Wait 1 second before showing next text
          setTimeout(() => {
            index++;
            showNextText();
          }, 1000);
        }, 3000);
      } else {
        // Restart the sequence after all texts are shown
        setTimeout(() => {
          index = 0;
          showNextText();
        }, 2000);
      }
    };

    showNextText();
  };

  return (
    <SectionContainer ref={sectionRef}>
      <VideoBackground ref={videoRef} muted loop playsInline>
        <source src={`${process.env.PUBLIC_URL}/sleep-problems.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      <OverlayGradient />

      <ContentContainer>
        <AnimatePresence>
          {showTitle && (
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Why We Can't Sleep
            </Title>
          )}
        </AnimatePresence>
      </ContentContainer>

      <TextContainer>
        <AnimatePresence mode="wait">
          {currentTextIndex >= 0 && (
            <SequentialText
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {texts[currentTextIndex]}
            </SequentialText>
          )}
        </AnimatePresence>
      </TextContainer>
    </SectionContainer>
  );
};

export default SleepProblemsSection;
