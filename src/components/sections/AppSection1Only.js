import React from 'react';
import styled from 'styled-components';
import AppSectionWrapper from './AppSectionWrapper';
import AppSection from './AppSection';
import appBg from '../../assets/images/app-section/app-bg1.png';

const AppSection1Container = styled.div`
  position: relative;
  width: 100%;
`;

const AppSection1Only = () => {
  return (
    <AppSection1Container>
      <AppSectionWrapper
        bgImage={appBg}
        index={0}
        totalSections={1}
      >
        <AppSection />
      </AppSectionWrapper>
    </AppSection1Container>
  );
};

export default AppSection1Only;