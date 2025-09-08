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
  margin-bottom: 30px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

const Notice = styled(motion.p)`
  color: #ff7640;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
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
  margin-left: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 15px;
    margin-left: 15px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 8px;
  }
`;

const Link = styled.a`
  color: #ff7640;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TermsOfServicePage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Title {...fadeInUp}>Terms of Service</Title>
        <EffectiveDate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Effective Date: 3rd September 2025
        </EffectiveDate>
        
        <Notice
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS WEBSITE
        </Notice>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle>Who we are and how to contact us</SectionTitle>
          <Paragraph>
            The Naptick waitlist website is operated by Naptick Wellness Pvt. Ltd. ("Naptick", "we", "our", "us"). 
            We are registered in India with our registered office at Mumbai, Maharashtra. You can contact us at{' '}
            <Link href="mailto:support@naptick.com">support@naptick.com</Link>.
          </Paragraph>
          <Paragraph>
            By using our site or joining the waitlist, you confirm that you accept these Terms of Service and 
            that you agree to comply with them. If you do not agree to these Terms, you must not use our site.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>Other terms that may apply</SectionTitle>
          <Paragraph>
            These Terms refer to the following additional terms, which also apply to your use of our site:
          </Paragraph>
          <List>
            <ListItem>Our Privacy Policy, which explains how we collect and use your personal data.</ListItem>
            <ListItem>Our Cookie Policy, which provides details about cookies used on our site.</ListItem>
          </List>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionTitle>We may update these terms</SectionTitle>
          <Paragraph>
            We may revise these Terms from time to time. Every time you wish to use our site, please check 
            these Terms to ensure you understand the terms that apply at that time.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SectionTitle>Changes to our site</SectionTitle>
          <Paragraph>
            We may update and change our site occasionally to reflect changes in our business, user needs, 
            or regulatory requirements. We do not guarantee that the site, or any content on it, will always 
            be available or uninterrupted.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <SectionTitle>Use of our site</SectionTitle>
          <Paragraph>
            Our site is made available free of charge. You are responsible for ensuring that all persons 
            who access our site through your internet connection are aware of these Terms and comply with them.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SectionTitle>Intellectual property rights</SectionTitle>
          <Paragraph>
            We are the owner or licensee of all intellectual property rights in our site, and in the material 
            published on it. All rights are reserved. You may print or download extracts for your personal use 
            only, but you must not modify them or use them for commercial purposes without our written consent.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <SectionTitle>Do not rely on information on our site</SectionTitle>
          <Paragraph>
            The content on our site is provided for general information only and does not constitute professional 
            advice. You should obtain professional or specialist advice before taking, or refraining from, any 
            action based on the content of our site.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <SectionTitle>Linking to other sites</SectionTitle>
          <Paragraph>
            Our site may include links to third-party websites. These links are provided for your information 
            only. We have no control over the content of those sites and accept no responsibility for them.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <SectionTitle>Uploading or sharing content</SectionTitle>
          <Paragraph>
            If you provide any content, including suggestions, comments, or feedback, you agree that such 
            content may be used by us without restriction. You must not upload or share any material that 
            is unlawful, offensive, or infringes the rights of others.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <SectionTitle>Viruses and misuse of our site</SectionTitle>
          <Paragraph>
            We do not guarantee that our site will be secure or free from bugs or viruses. You must not 
            misuse our site by knowingly introducing viruses, trojans, worms, or other harmful material.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <SectionTitle>Limitation of liability</SectionTitle>
          <Paragraph>
            We do not exclude or limit our liability to you where it would be unlawful to do so. To the 
            extent permitted by law, we exclude all conditions, warranties, and representations that may 
            apply to our site or any content on it.
          </Paragraph>
          <Paragraph>
            We only provide our site for domestic and private use. You agree not to use our site for any 
            commercial or business purposes, and we have no liability to you for any loss of profit, 
            business interruption, or loss of business opportunity.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <SectionTitle>Governing law</SectionTitle>
          <Paragraph>
            These Terms, their subject matter, and their formation are governed by the laws of India. 
            You agree that the courts of Mumbai, Maharashtra, will have exclusive jurisdiction over any 
            disputes arising in connection with these Terms.
          </Paragraph>
        </Section>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default TermsOfServicePage;