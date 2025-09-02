# Naptick Frontend - Project Structure Documentation

## 🏗️ Architecture Overview

This React application follows a modular, component-based architecture designed for scalability, maintainability, and ease of onboarding new developers.

## 📁 Folder Structure

```
naptick-frontend/
├── public/                  # Static files
├── src/
│   ├── assets/             # Media and static assets
│   │   ├── images/         # Image files (PNG, JPG, SVG)
│   │   └── videos/         # Video files
│   │       └── intro-video.mp4
│   │
│   ├── components/         # Reusable components
│   │   ├── common/         # Shared UI components
│   │   ├── layout/         # Layout components
│   │   │   └── Header/     # Navigation header
│   │   │       └── Header.js
│   │   ├── sections/       # Page sections
│   │   │   └── HeroSection.js
│   │   ├── LoadingScreen/  # Loading screen component
│   │   │   └── LoadingScreen.js
│   │   └── VideoIntro/     # Video intro component
│   │       └── VideoIntro.js
│   │
│   ├── pages/              # Page components
│   │   └── HomePage/       # Homepage
│   │       └── HomePage.js
│   │
│   ├── styles/             # Global styles and theme
│   │   ├── GlobalStyles.js # Global CSS styles
│   │   └── theme.js        # Theme configuration
│   │
│   ├── utils/              # Utility functions (future)
│   ├── hooks/              # Custom React hooks (future)
│   ├── services/           # API services (future)
│   │
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
│
├── .gitignore
├── package.json            # Dependencies and scripts
├── README.md              # Project documentation
└── PROJECT_STRUCTURE.md   # This file
```

## 🎯 Key Design Principles

### 1. **Component Organization**
- **Common**: Reusable UI elements (buttons, modals, forms)
- **Layout**: Structural components (header, footer, sidebar)
- **Sections**: Page-specific sections (hero, features, testimonials)
- **Pages**: Complete page compositions

### 2. **Naming Conventions**
- **Components**: PascalCase (e.g., `HeroSection.js`)
- **Files**: Component name matches file name
- **Folders**: Component folders for complex components with multiple files
- **CSS-in-JS**: Styled components use descriptive names with Container/Wrapper suffixes

### 3. **State Management**
- Local state for component-specific data
- Context API for global state (future implementation)
- SessionStorage for temporary data (e.g., intro video shown status)

### 4. **Styling Architecture**
- **Styled Components**: CSS-in-JS for component styling
- **Theme System**: Centralized theme configuration
- **Global Styles**: Reset and base styles
- **Responsive Design**: Mobile-first approach with breakpoints

### 5. **Animation Strategy**
- **Framer Motion**: For complex animations
- **CSS Transitions**: For simple hover/focus states
- **Performance**: Hardware-accelerated animations

## 🚀 Application Flow

1. **Initial Load**
   - Video intro plays (first visit only)
   - Loading screen displays brand logo
   - Main content loads with navigation

2. **Navigation Structure**
   - Fixed header with smooth scroll
   - Responsive mobile menu
   - Section-based navigation for single-page experience

3. **Performance Optimizations**
   - Lazy loading for components (future)
   - Code splitting by route
   - Optimized media assets

## 💻 Development Guidelines

### Component Creation
```javascript
// Standard component structure
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const ComponentContainer = styled.div`
  // Styles here
`;

const ComponentName = () => {
  // Logic here
  return (
    <ComponentContainer>
      {/* Content */}
    </ComponentContainer>
  );
};

export default ComponentName;
```

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import in `HomePage.js`
3. Add navigation link in `Header.js`
4. Implement smooth scroll anchor

### Theme Customization
Edit `src/styles/theme.js`:
- Colors
- Typography
- Breakpoints
- Transitions
- Shadows

## 🛠️ Available Scripts

```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
npm eject       # Eject from Create React App (caution!)
```

## 📦 Key Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **styled-components**: CSS-in-JS styling
- **framer-motion**: Animations
- **react-scripts**: Build tooling

## 🔄 Future Enhancements

- [ ] Redux/Context for state management
- [ ] API integration layer
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] PWA features
- [ ] Internationalization (i18n)
- [ ] Analytics integration
- [ ] SEO optimization

## 👥 For New Developers

1. **Setup**: Clone repo, run `npm install`
2. **Understand**: Review this structure document
3. **Explore**: Check `theme.js` for design system
4. **Start**: Run `npm start` to see the app
5. **Contribute**: Follow component patterns and naming conventions

## 📝 Notes

- Always maintain component isolation
- Keep components pure and predictable
- Document complex logic
- Use meaningful variable names
- Test before committing
- Follow the established patterns

---

*This document should be updated as the project evolves.*