import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import HeroSectionNew from '../../components/sections/HeroSectionNew';
import SleepProblemsSection from '../../components/sections/SleepProblemsSection';
import RingFeaturesSectionGSAP from '../../components/sections/RingFeaturesSectionGSAP';
import InsideNaphomeVideoSection from '../../components/sections/InsideNaphomeVideoSection';
import AppSection1Only from '../../components/sections/AppSection1Only';
import Footer from '../../components/layout/Footer/Footer';

const HomeContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
  padding: 0 20px;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
  }
`;


const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSectionNew />
      <SleepProblemsSection />
      <RingFeaturesSectionGSAP />
      <InsideNaphomeVideoSection />
      <AppSection1Only />
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;