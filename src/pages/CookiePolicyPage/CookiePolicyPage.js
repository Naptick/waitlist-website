import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import Footer from '../../components/layout/Footer/Footer';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  min-height: 100vh;
  padding-top: 100px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-top: 80px;
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 40px 30px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 30px 20px;
  }
`;

const Title = styled(motion.h1)`
  color: ${theme.colors.text};
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 10px;
  }
`;

const EffectiveDate = styled(motion.p)`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 40px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 40px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  color: #ff7640;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.4rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
`;

const Paragraph = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const List = styled.ul`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  padding-left: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 15px;
    padding-left: 15px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 12px;
  list-style-type: disc;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

const BoldText = styled.strong`
  color: ${theme.colors.text};
  font-weight: 600;
`;

const Link = styled.a`
  color: #ff7640;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CookiePolicyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Title {...fadeInUp}>Cookie Policy</Title>
        
        <EffectiveDate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Effective Date: 3rd September 2025
        </EffectiveDate>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paragraph>
            This Cookie Policy explains how Naptick Wellness Pvt. Ltd. ("Naptick", "we", "our", "us") 
            uses cookies and similar technologies on our waitlist website (the "Site"). By continuing 
            to browse or use our Site, you agree to our use of cookies as described in this policy.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle>What are cookies</SectionTitle>
          <Paragraph>
            Cookies are small text files that are placed on your device when you visit a website. 
            They are widely used to make websites work more efficiently, to improve user experience, 
            and to provide information to the site owners.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>How we use cookies</SectionTitle>
          <Paragraph>We use cookies to:</Paragraph>
          <List>
            <ListItem>Ensure the proper functioning of our Site</ListItem>
            <ListItem>Remember your preferences (such as language or region)</ListItem>
            <ListItem>Improve site performance and security</ListItem>
            <ListItem>Analyze how visitors use our Site to help us improve its functionality</ListItem>
            <ListItem>Support marketing efforts and measure engagement with our waitlist</ListItem>
          </List>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionTitle>Types of cookies we use</SectionTitle>
          <List>
            <ListItem>
              <BoldText>Essential cookies</BoldText> – Required for the operation of our Site. 
              Without these, certain services cannot be provided.
            </ListItem>
            <ListItem>
              <BoldText>Performance cookies</BoldText> – Collect anonymous information about how 
              visitors use our Site.
            </ListItem>
            <ListItem>
              <BoldText>Functional cookies</BoldText> – Remember your preferences and choices to 
              improve your experience.
            </ListItem>
            <ListItem>
              <BoldText>Marketing cookies</BoldText> – Track visits across websites to display 
              relevant promotions and measure campaign effectiveness.
            </ListItem>
          </List>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SectionTitle>Third-party cookies</SectionTitle>
          <Paragraph>
            Some cookies may be placed by third-party service providers (such as analytics or marketing 
            partners) to help us analyze usage or deliver targeted content. We do not control these 
            cookies, and you should review the third parties' cookie policies for more information.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <SectionTitle>Managing cookies</SectionTitle>
          <Paragraph>
            You can control and manage cookies through your browser settings. Most browsers allow you 
            to refuse cookies or alert you when cookies are being sent. Please note that disabling 
            cookies may affect the functionality of our Site and limit your experience.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SectionTitle>Updates to this policy</SectionTitle>
          <Paragraph>
            We may update this Cookie Policy from time to time to reflect changes in technology, 
            legal requirements, or our business practices. We encourage you to review this policy 
            periodically.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <SectionTitle>Contact us</SectionTitle>
          <Paragraph>
            If you have any questions about this Cookie Policy, please contact us at{' '}
            <Link href="mailto:support@naptick.com">support@naptick.com</Link>.
          </Paragraph>
        </Section>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default CookiePolicyPage;