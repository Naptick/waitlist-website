import React from 'react';
import styled from 'styled-components';
import HeroSectionNew from '../../components/sections/HeroSectionNew';
import SleepProblemsSection from '../../components/sections/SleepProblemsSection';
import RingFeaturesSectionGSAP from '../../components/sections/RingFeaturesSectionGSAP';
import InsideNaphomeVideoSection from '../../components/sections/InsideNaphomeVideoSection';
import NaptickFullVideoSection from '../../components/sections/NaptickFullVideoSection';
import StoryCard from '../../components/sections/StoryCard';
import AppSection1Only from '../../components/sections/AppSection1Only';
import SectionCard from '../../components/common/SectionCard';
import { theme } from '../../styles/theme';

// Import story images
import story1 from '../../assets/images/storytelling/story-1.jpg';
import story2 from '../../assets/images/storytelling/story-2.jpg';
import story3 from '../../assets/images/storytelling/story-3.jpg';
import story4 from '../../assets/images/storytelling/story-4.jpg';

const HomeContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
  padding: 0 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: ${theme.colors.gradientPurple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionContent = styled.div`
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: 1.2rem;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSectionNew />
      <SleepProblemsSection />
      <RingFeaturesSectionGSAP />
      <InsideNaphomeVideoSection />
      <AppSection1Only />
      {/* <NaptickFullVideoSection /> */}
      {/* <StoryCard
        title="Track Your Sleep Patterns"
        description="Monitor your sleep cycles with precision and discover insights about your nightly rest patterns."
        bgImage={story1}
      />
      <StoryCard
        title="Heart Rate & Recovery"
        description="24/7 heart rate monitoring helps you understand your body's recovery and stress levels."
        bgImage={story2}
      />
      <StoryCard
        title="Smart Insights"
        description="Get personalized recommendations based on your unique sleep and activity data."
        bgImage={story3}
      />
      <StoryCard
        title="Seamless Integration"
        description="Connect with your favorite health apps and build a complete picture of your wellness journey."
        bgImage={story4}
      />
      <SectionCard id="our-story">
        <SectionTitle>Our Story</SectionTitle>
        <SectionContent>
          <p>We believe everyone deserves better sleep. Our mission is to make premium sleep technology accessible, helping you understand and optimize your recovery without complicated subscriptions or hidden fees.</p>
        </SectionContent>
      </SectionCard>
      <SectionCard id="contact">
        <SectionTitle>Contact Us</SectionTitle>
        <SectionContent>
          <p>Ready to transform your sleep? Get in touch with our team or join our waitlist to be the first to experience the future of sleep tracking.</p>
        </SectionContent>
      </SectionCard> */}
    </HomeContainer>
  );
};

export default HomePage;