import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { trackSectionView, trackCTAClick } from "../../utils/analytics";

const FAQContainer = styled.section`
  background: ${theme.colors.background};
  padding: 100px 20px;
  width: 100%;
  min-height: 80vh;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 80px 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 60px 20px;
  }
`;

const FAQContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  overflow: visible;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 800px;
  }
`;

const FAQTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #ff7640 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  width: 100%;

  .mobile-break {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.8rem, 6vw, 2.5rem);
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    white-space: normal;
    line-height: 0.9;
    padding: 0 10px;

    .mobile-break {
      display: block;
      margin: -5px 0;
    }

    .mobile-break br {
      line-height: 0;
    }
  }
`;

const FAQSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 60px;
  text-align: center;
  line-height: 1.6;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const FAQItem = styled(motion.div)`
  background: ${theme.colors.backgroundLight};
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all ${theme.transitions.medium};
  width: 100%;

  &:hover {
    border-color: #ff7640;
    box-shadow: 0 10px 30px rgba(255, 118, 64, 0.1);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 25px 30px;
  background: transparent;
  border: none;
  color: ${theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    color: #ff7640;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20px 20px;
    font-size: 1rem;
  }
`;

const FAQIcon = styled(motion.div)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7640;
  font-weight: bold;
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-left: 20px;
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 30px 25px 30px;
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
  text-align: left;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 20px 20px 20px;
    font-size: 0.95rem;
    text-align: left;
    word-spacing: normal;
    hyphens: none;
  }
`;

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView("FAQ Section");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("faq-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const faqData = [
    {
      id: 1,
      question: "When will Naphome be available?",
      answer:
        "Naphome is currently in final development stages. Waitlist members will get early access notifications and up to 50% savings when we launch, expected by the end of 2025.",
    },
    {
      id: 2,
      question: "What environmental factors does it monitor?",
      answer:
        "Naphome tracks temperature, humidity, CO₂ levels, volatile organic compounds (VOCs), particulate matter (PM 2.5) and ambient light to optimize your sleep environment.",
    },
    {
      id: 3,
      question: "How does the Phone-Away mode work?",
      answer:
        "When you start a sleep routine, Naphome can automatically enable Do Not Disturb on your phone and temporarily block social media apps, entertainment apps etc, helping you disconnect and wind down naturally.",
    },
    {
      id: 4,
      question: "How do I set up and connect to Naphome?",
      answer:
        "Setting up Naphome is quick and easy! The device connects to your phone via Bluetooth through a simple one-time pairing process. Each Naphome comes with detailed instructions to get you up and running in just a few minutes.",
    },
    {
      id: 5,
      question: "What kind of sleep routines does Naphome provide?",
      answer:
        "Naphome offers personalized guided routines combining calming light transitions, soothing soundscapes, guided meditation, sleep stories and breathing exercises to help you naturally wind down for deep, restorative sleep.",
    },
    {
      id: 6,
      question: "What happens after I join the waitlist?",
      answer:
        "You'll receive email updates on our development progress, early access notifications and exclusive content about sleep optimization. No spam and you can unsubscribe anytime.",
    },
  ];

  const toggleItem = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
    trackCTAClick(
      `FAQ Question: ${faqData.find((item) => item.id === itemId)?.question}`,
      "FAQ Section"
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <FAQContainer id="faq-section">
      <FAQContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQTitle variants={itemVariants}>
            Frequently Asked
            <span className="mobile-break">
              <br />
            </span>{" "}
            Questions
          </FAQTitle>

          <FAQSubtitle variants={itemVariants}>
            Everything you need to know about Naphome and getting early access
          </FAQSubtitle>

          <FAQList>
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FAQQuestion
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItem === item.id}
                >
                  <span>{item.question}</span>
                  <FAQIcon
                    animate={{ rotate: openItem === item.id ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    +
                  </FAQIcon>
                </FAQQuestion>

                <AnimatePresence>
                  {openItem === item.id && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {item.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQList>
        </motion.div>
      </FAQContent>
    </FAQContainer>
  );
};

export default FAQSection;
