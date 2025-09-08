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
  margin-bottom: 40px;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 25px;
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
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
`;

const SubsectionTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 25px;
  margin-bottom: 15px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-top: 20px;
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

const Link = styled.a`
  color: #ff7640;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const PrivacyPolicyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Title {...fadeInUp}>Privacy Policy</Title>
        
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle>Who we are</SectionTitle>
          <Paragraph>
            Our website address is: <Link href="https://naptick.com" target="_blank" rel="noopener noreferrer">https://naptick.com</Link>.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>What personal data we collect and why we collect it</SectionTitle>
          
          <SubsectionTitle>Comments</SubsectionTitle>
          <Paragraph>
            When visitors leave comments on the site we collect the data shown in the comments form, 
            and also the visitor's IP address and browser user agent string to help spam detection.
          </Paragraph>
          <Paragraph>
            An anonymized string created from your email address (also called a hash) may be provided 
            to the Gravatar service to see if you are using it. The Gravatar service privacy policy is 
            available here: <Link href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer">https://automattic.com/privacy/</Link>. 
            After approval of your comment, your profile picture is visible to the public in the context of your comment.
          </Paragraph>

          <SubsectionTitle>Media</SubsectionTitle>
          <Paragraph>
            If you upload images to the website, you should avoid uploading images with embedded location 
            data (EXIF GPS) included. Visitors to the website can download and extract any location data 
            from images on the website.
          </Paragraph>

          <SubsectionTitle>Contact forms</SubsectionTitle>
          
          <SubsectionTitle>Cookies</SubsectionTitle>
          <Paragraph>
            If you leave a comment on our site you may opt-in to saving your name, email address and 
            website in cookies. These are for your convenience so that you do not have to fill in your 
            details again when you leave another comment. These cookies will last for one year.
          </Paragraph>
          <Paragraph>
            If you have an account and you log in to this site, we will set a temporary cookie to 
            determine if your browser accepts cookies. This cookie contains no personal data and is 
            discarded when you close your browser.
          </Paragraph>
          <Paragraph>
            When you log in, we will also set up several cookies to save your login information and 
            your screen display choices. Login cookies last for two days, and screen options cookies 
            last for a year. If you select "Remember Me", your login will persist for two weeks. If 
            you log out of your account, the login cookies will be removed.
          </Paragraph>
          <Paragraph>
            If you edit or publish an article, an additional cookie will be saved in your browser. 
            This cookie includes no personal data and simply indicates the post ID of the article you 
            just edited. It expires after 1 day.
          </Paragraph>

          <SubsectionTitle>Embedded content from other websites</SubsectionTitle>
          <Paragraph>
            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). 
            Embedded content from other websites behaves in the exact same way as if the visitor has 
            visited the other website.
          </Paragraph>
          <Paragraph>
            These websites may collect data about you, use cookies, embed additional third-party tracking, 
            and monitor your interaction with that embedded content, including tracing your interaction 
            with the embedded content if you have an account and are logged in to that website.
          </Paragraph>

          <SubsectionTitle>Analytics</SubsectionTitle>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle>How long we retain your data</SectionTitle>
          <Paragraph>
            If you leave a comment, the comment and its metadata are retained indefinitely. This is so 
            we can recognize and approve any follow-up comments automatically instead of holding them in 
            a moderation queue.
          </Paragraph>
          <Paragraph>
            For users that register on our website (if any), we also store the personal information they 
            provide in their user profile. All users can see, edit, or delete their personal information 
            at any time (except they cannot change their username). Website administrators can also see 
            and edit that information.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>What rights you have over your data</SectionTitle>
          <Paragraph>
            If you have an account on this site, or have left comments, you can request to receive an 
            exported file of the personal data we hold about you, including any data you have provided 
            to us. You can also request that we erase any personal data we hold about you. This does not 
            include any data we are obliged to keep for administrative, legal, or security purposes.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionTitle>Where we send your data</SectionTitle>
          <Paragraph>
            Visitor comments may be checked through an automated spam detection service.
          </Paragraph>
        </Section>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default PrivacyPolicyPage;