import { css } from 'styled-components';

// Responsive breakpoints
export const breakpoints = {
  xs: 320,     // Extra small phones
  sm: 480,     // Small phones
  md: 768,     // Tablets
  lg: 1024,    // Desktop
  xl: 1280,    // Large desktop
  xxl: 1536,   // Extra large desktop
  xxxl: 1920   // Full HD and above
};

// Media query helpers
export const media = {
  xs: (...args) => css`
    @media (min-width: ${breakpoints.xs}px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (min-width: ${breakpoints.sm}px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: ${breakpoints.md}px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${breakpoints.lg}px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: ${breakpoints.xl}px) {
      ${css(...args)}
    }
  `,
  xxl: (...args) => css`
    @media (min-width: ${breakpoints.xxl}px) {
      ${css(...args)}
    }
  `,
  xxxl: (...args) => css`
    @media (min-width: ${breakpoints.xxxl}px) {
      ${css(...args)}
    }
  `,
  // Max width queries for mobile-first approach
  maxSm: (...args) => css`
    @media (max-width: ${breakpoints.sm - 1}px) {
      ${css(...args)}
    }
  `,
  maxMd: (...args) => css`
    @media (max-width: ${breakpoints.md - 1}px) {
      ${css(...args)}
    }
  `,
  maxLg: (...args) => css`
    @media (max-width: ${breakpoints.lg - 1}px) {
      ${css(...args)}
    }
  `,
  maxXl: (...args) => css`
    @media (max-width: ${breakpoints.xl - 1}px) {
      ${css(...args)}
    }
  `,
};

// Responsive spacing utilities
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

// Responsive font sizes
export const fontSize = {
  xs: 'clamp(0.75rem, 1.5vw, 0.875rem)',
  sm: 'clamp(0.875rem, 2vw, 1rem)',
  base: 'clamp(1rem, 2.5vw, 1.125rem)',
  lg: 'clamp(1.125rem, 3vw, 1.25rem)',
  xl: 'clamp(1.25rem, 3.5vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 4vw, 1.875rem)',
  '3xl': 'clamp(1.875rem, 4.5vw, 2.25rem)',
  '4xl': 'clamp(2.25rem, 5vw, 3rem)',
  '5xl': 'clamp(3rem, 6vw, 3.75rem)',
  '6xl': 'clamp(3.75rem, 7vw, 4.5rem)',
};

// Container widths for different screens
export const containerWidth = {
  sm: '100%',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1400px',
};

// Responsive padding for containers
export const containerPadding = {
  mobile: '16px',
  tablet: '24px',
  desktop: '32px',
  wide: '40px',
};

// Export default responsive utilities
export default {
  breakpoints,
  media,
  spacing,
  fontSize,
  containerWidth,
  containerPadding,
};