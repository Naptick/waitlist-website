import React from 'react';
import styled from 'styled-components';
import HeroSectionNew from '../../components/sections/HeroSectionNew';
import SleepProblemsSection from '../../components/sections/SleepProblemsSection';
import RingFeaturesSectionGSAP from '../../components/sections/RingFeaturesSectionGSAP';
import InsideNaphomeVideoSection from '../../components/sections/InsideNaphomeVideoSection';
import AppSection1Only from '../../components/sections/AppSection1Only';

const HomeContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
  padding: 0 20px;
  position: relative;
`;


const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSectionNew />
      <SleepProblemsSection />
      <RingFeaturesSectionGSAP />
      <InsideNaphomeVideoSection />
      <AppSection1Only />
      {/* <ExperienceNaphome /> */}
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