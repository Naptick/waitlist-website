import React from 'react';
import styled from 'styled-components';
import AppSectionsCurtain from '../../components/sections/AppSectionsCurtain';

const NaptickAppContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
  padding: 0 20px;
  position: relative;
  padding-top: 100px; // Space for header
`;

const NaptickAppPage = () => {
  return (
    <NaptickAppContainer>
      <AppSectionsCurtain />
    </NaptickAppContainer>
  );
};

export default NaptickAppPage;