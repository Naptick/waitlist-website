import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getShareTemplates } from '../../utils/referralUtils';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: ${theme.shadows.large};
  backdrop-filter: blur(20px);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  
  &:hover {
    color: ${theme.colors.textPrimary};
  }
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 600;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const ReferralSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

const ReferralTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 15px;
  font-size: 18px;
`;

const ReferralUrlContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ReferralInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.text};
  outline: none;
`;

const CopyButton = styled(motion.button)`
  background: #ff7640;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e55a2b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 118, 64, 0.3);
  }
`;

const ShareButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ShareButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  gap: 8px;
  transition: all 0.3s ease;
  
  &.whatsapp {
    background: #25D366;
    color: white;
  }
  
  &.twitter {
    background: #1DA1F2;
    color: white;
  }
  
  &.facebook {
    background: #4267B2;
    color: white;
  }
  
  &.email {
    background: ${theme.colors.textSecondary};
    color: white;
  }
`;

const ContinueButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #ff7640;
  color: #ff7640;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff7640;
    color: white;
    transform: translateY(-1px);
  }
`;

const ShareModal = ({ isOpen, onClose, userData }) => {
  const [copied, setCopied] = useState(false);
  
  const { refCode, email, fullName, referralUrl } = userData || {};
  
  const shareTemplates = referralUrl ? getShareTemplates(referralUrl) : {};

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShare = (platform) => {
    if (platform === 'copy') {
      handleCopyLink();
      return;
    }
    
    window.open(shareTemplates[platform], '_blank', 'width=600,height=400');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>&times;</CloseButton>
          
          <SuccessIcon>🎉</SuccessIcon>
          
          <Title>Welcome to Naptick!</Title>
          <Message>
            Thanks {fullName && fullName.split(' ')[0]} for joining our waitlist! 
            You're one step closer to better sleep.
            <br /><br />
            Share your referral link with friends and move up the list faster!
          </Message>
          
          <ReferralSection>
            <ReferralTitle>Your Referral Link</ReferralTitle>
            <ReferralUrlContainer>
              <ReferralInput 
                value={referralUrl || ''} 
                readOnly 
              />
              <CopyButton
                onClick={handleCopyLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </CopyButton>
            </ReferralUrlContainer>
            
            <ShareButtonsContainer>
              <ShareButton 
                className="whatsapp"
                href={shareTemplates.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📱 WhatsApp
              </ShareButton>
              
              <ShareButton 
                className="twitter"
                href={shareTemplates.twitter}
                target="_blank"
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🐦 Twitter
              </ShareButton>
              
              <ShareButton 
                className="facebook"
                href={shareTemplates.facebook}
                target="_blank"
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📘 Facebook
              </ShareButton>
              
              <ShareButton 
                className="email"
                href={shareTemplates.email}
                as={motion.a}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✉️ Email
              </ShareButton>
            </ShareButtonsContainer>
          </ReferralSection>
          
          <ContinueButton
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Exploring
          </ContinueButton>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default ShareModal;