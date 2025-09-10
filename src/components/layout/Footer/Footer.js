import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../../styles/theme';
import linkedinIcon from '../../../assets/images/footer/linkedin.png';
import instagramIcon from '../../../assets/images/footer/instagram.png';
import { trackSocialClick } from '../../../utils/analytics';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 60px 0 20px 0;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: 30px;
    padding: 40px 0 20px 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 20px;
    padding: 30px 0 15px 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 0 30px;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
    text-align: center;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 25px;
    padding: 0 15px;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const CompanySection = styled(FooterSection)`
  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: flex-start; /* Align to left on mobile */
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ff7640;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
`;

const Description = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 30px;
  font-size: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 20px;
    padding: 0; /* Remove padding to align with logo */
    text-align: left; /* Ensure left alignment */
  }
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LinkItem = styled.li`
  margin-bottom: 12px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

const FooterLink = styled.a`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff7640;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: ${theme.colors.textSecondary};
  font-size: 0.95rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 10px;
    justify-content: flex-start; /* Align to left on mobile */
  }
`;

const ContactIcon = styled.span`
  margin-right: 12px;
  font-size: 1.1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-right: 8px;
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: ${theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff7640;
    transform: translateY(-2px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px;
  padding-right: 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Footer = () => {
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
    <FooterContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FooterContent>
          <CompanySection variants={itemVariants}>
            <Logo>Naptick</Logo>
            <Description>
              Transform your sleep with intelligent tracking technology. 
              Sleep more, stress less, and wake up to your best self every day.
            </Description>
            <SocialLinks>
              <SocialLink
                href="https://x.com/naptick_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackSocialClick('Twitter/X')}
              >
                𝕏
              </SocialLink>
              <SocialLink
                href="https://instagram.com/naptick"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackSocialClick('Instagram')}
              >
                <SocialIcon src={instagramIcon} alt="Instagram" />
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/company/naptick"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackSocialClick('LinkedIn')}
              >
                <SocialIcon src={linkedinIcon} alt="LinkedIn" />
              </SocialLink>
            </SocialLinks>
          </CompanySection>

          {/* <FooterSection variants={itemVariants}>
            <SectionTitle>Product</SectionTitle>
            <LinkList>
              <LinkItem>
                <FooterLink href="#naphome">Naphome</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#the-app">Mobile App</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/features">Features</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </LinkItem>
            </LinkList>
          </FooterSection>

          <FooterSection variants={itemVariants}>
            <SectionTitle>Company</SectionTitle>
            <LinkList>
              <LinkItem>
                <FooterLink href="/about">About Us</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/careers">Careers</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/blog">Blog</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="/press">Press</FooterLink>
              </LinkItem>
            </LinkList>
          </FooterSection> */}

          <FooterSection variants={itemVariants}>
            <SectionTitle>Contact</SectionTitle>
            <ContactInfo>
              <ContactIcon>📧</ContactIcon>
              support@naptick.com
            </ContactInfo>
            {/* <ContactInfo>
              <ContactIcon>📞</ContactIcon>
              +1 (555) 123-4567
            </ContactInfo> */}
            <ContactInfo>
              <ContactIcon>📍</ContactIcon>
              Seattle, USA
            </ContactInfo>
          </FooterSection>
        </FooterContent>

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Naptick. All rights reserved.
          </Copyright>
          <LegalLinks>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </LegalLinks>
        </BottomBar>
      </motion.div>
    </FooterContainer>
  );
};

export default Footer;