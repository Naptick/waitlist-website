import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getUserLocation, getDeviceInfo, getAttributionData } from '../../services/geolocationService';
import { generateReferralCode, hashIP } from '../../utils/referralUtils';
import { submitCustomWaitlist } from '../../utils/waitlistService';

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
  z-index: 10000;
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

const Title = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: 10px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 30px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.text};
  
  &::placeholder {
    color: ${theme.colors.textSecondary};
  }
  
  &:focus {
    border-color: #ff7640;
    box-shadow: 0 0 0 3px rgba(255, 118, 64, 0.2);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:invalid {
    border-color: #ff4757;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  background: white;
  cursor: pointer;
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #ff7640;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #e55a2b;
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(255, 118, 64, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  background: rgba(255, 107, 107, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CustomWaitlistForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    country: '',
    city: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadUserLocation();
    }
  }, [isOpen]);

  const loadUserLocation = async () => {
    try {
      setLocationLoading(true);
      const location = await getUserLocation();
      setFormData(prev => ({
        ...prev,
        country: location.country,
        city: location.city
      }));
    } catch (error) {
      console.warn('Location loading failed:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const location = await getUserLocation();
      const deviceInfo = getDeviceInfo();
      const attribution = getAttributionData();
      const refCode = generateReferralCode();
      
      const ipHash = location.ip ? await hashIP(location.ip) : null;

      const signupData = {
        ...formData,
        refCode,
        referrerCode: attribution.ref || null,
        signupLocation: {
          country: location.country,
          region: location.region,
          city: location.city,
          timezone: location.timezone,
          latitude: location.latitude,
          longitude: location.longitude
        },
        deviceInfo,
        attribution,
        ipHash,
        timestamp: new Date().toISOString()
      };

      const result = await submitCustomWaitlist(signupData);
      
      onSuccess({
        refCode,
        email: formData.email,
        fullName: formData.fullName,
        referralUrl: `${window.location.origin}/?ref=${refCode}`
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
          
          <Title>Join the Waitlist</Title>
          <Subtitle>Be among the first to experience better sleep with Naptick</Subtitle>
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="fullName">Full Name (Optional)</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <SubmitButton
              type="submit"
              disabled={loading || locationLoading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <LoadingSpinner /> Joining...
                </>
              ) : (
                'Join the Waitlist'
              )}
            </SubmitButton>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default CustomWaitlistForm;