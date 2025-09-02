import React from 'react';
import styled from 'styled-components';

const ParallaxWrapper = styled.div`
  position: relative;
  height: 500vh; /* Total height for all 5 sections */
`;

const StickySection = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  /* No margin - sections stack directly */
`;

const ParallaxContainer = ({ children }) => {
  const childArray = React.Children.toArray(children);
  
  return (
    <ParallaxWrapper>
      {childArray.map((child, index) => (
        <StickySection key={index}>
          {child}
        </StickySection>
      ))}
    </ParallaxWrapper>
  );
};

export default ParallaxContainer;