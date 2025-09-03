import React, { useEffect } from 'react';
import styled from 'styled-components';
import AppSectionsCurtain from '../../components/sections/AppSectionsCurtain';

const NaptickAppContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  padding-top: 100px; // Space for header
`;

const NaptickAppPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Small delay to ensure DOM is ready and then scroll to top again
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <NaptickAppContainer>
      <AppSectionsCurtain />
    </NaptickAppContainer>
  );
};

export default NaptickAppPage;