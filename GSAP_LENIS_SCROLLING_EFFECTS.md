# GSAP & Lenis Scrolling Effects Guide

## 🚀 **GSAP ScrollTrigger Effects**

### **1. Pinning & Scrubbing Effects**
- **Section Pinning**: Pin sections in place while content scrolls over them
- **Timeline Scrubbing**: Control animation progress with scroll position
- **Card Stack Effects**: Stack cards that peel away as you scroll
- **Horizontal Scrollers**: Pin vertical section, scroll horizontally inside

### **2. Reveal & Transition Effects**
- **Mask Reveal Animations**: Elements reveal from behind masks
- **Clip Path Reveals**: Geometric shape reveals
- **Text Reveals**: Character-by-character, word-by-word animations
- **Image Curtain Effects**: Images reveal like opening curtains
- **Split Screen Transitions**: Sections slide in from different directions

### **3. Parallax Effects**
- **Multi-layer Parallax**: Background, midground, foreground moving at different speeds
- **Perspective Scrolling**: 3D-like depth effects
- **Image Parallax**: Background images moving slower than content
- **Text Parallax**: Headlines moving at different speeds

### **4. Advanced Morphing**
- **Path Morphing**: SVG paths transforming as you scroll
- **Shape Morphing**: Elements changing shape during scroll
- **Color Transitions**: Gradual color changes based on scroll
- **Size Scaling**: Elements growing/shrinking with scroll position

## 🌊 **Lenis Smooth Scrolling Effects**

### **1. Momentum & Easing**
- **Natural Momentum**: Physics-based scroll deceleration
- **Custom Easing**: Bezier curve-based scroll feel
- **Smooth Snap**: Snap to sections with smooth deceleration
- **Directional Locking**: Prevent diagonal scrolling

### **2. Performance Optimizations**
- **Native Scrollbar**: Maintains accessibility
- **60fps Scrolling**: Butter-smooth performance
- **Mobile Optimization**: Touch-friendly scrolling
- **Reduced Motion Support**: Respects user preferences

## 🎨 **Combined GSAP + Lenis Effects**

### **1. Advanced Parallax Systems**
```javascript
// Multi-layer parallax with smooth scrolling
lenis.on('scroll', (e) => {
  gsap.set('.bg-layer', { y: e.scroll * -0.5 });
  gsap.set('.mid-layer', { y: e.scroll * -0.3 });
  gsap.set('.fg-layer', { y: e.scroll * -0.1 });
});
```

### **2. Horizontal Scroll Galleries**
- Pin vertical section, scroll horizontally through images
- Smooth momentum for horizontal navigation
- Perfect for portfolio galleries

### **3. Cinematic Reveals**
- Elements reveal like movie scenes
- Synchronized with smooth scroll progress
- Text and images appearing in sequence

### **4. Interactive Storytelling**
- Story unfolds based on scroll position
- Characters move through scenes
- Background changes dynamically

## 🔥 **Creative Effects You Can Implement**

### **Immediate Effects** (Easy to add):
1. **Staggered Cards**: Cards animate in with delays
2. **Text Reveals**: Words appear one by one
3. **Image Parallax**: Backgrounds move slower
4. **Smooth Page Transitions**: Between sections
5. **Scroll-triggered Counters**: Numbers animate up

### **Advanced Effects** (More complex):
1. **Morphing Header**: Navigation changes as you scroll
2. **3D Carousel**: Cards flip in 3D space
3. **Particle Systems**: Elements react to scroll
4. **Video Scrubbing**: Video plays based on scroll
5. **Physics Simulations**: Elements bounce and react

### **Portfolio Showcase Effects**:
1. **Project Reveals**: Each project slides in uniquely
2. **Interactive Timeline**: Events appear as you scroll
3. **Product Showcases**: 360° product views
4. **Before/After Sliders**: Controlled by scroll
5. **Interactive Infographics**: Data visualization

## 💡 **For Your Naptick Project**

### **Recommended Effects**:
1. **Floating Ring**: Product image parallax effect
2. **Feature Reveals**: App features slide in from bottom
3. **Statistics Counter**: Sleep improvement numbers animate
4. **Testimonial Carousel**: Smooth horizontal scrolling
5. **Call-to-Action Reveals**: Buttons appear dramatically

### **Implementation Examples**

#### **Basic GSAP ScrollTrigger Setup**:
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in elements on scroll
gsap.fromTo('.fade-in', 
  { opacity: 0, y: 50 },
  { 
    opacity: 1, 
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.fade-in',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true
    }
  }
);
```

#### **Lenis Smooth Scroll Setup**:
```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

#### **Combined GSAP + Lenis Integration**:
```javascript
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize Lenis
const lenis = new Lenis();

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing for better performance
gsap.ticker.lagSmoothing(0);
```

## 📚 **Resources & Documentation**

### **GSAP Resources**:
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP Demos & Examples](https://gsap.com/demos/)
- [ScrollTrigger Tutorial](https://gsap.com/scroll/)

### **Lenis Resources**:
- [Lenis Official Site](https://lenis.darkroom.engineering/)
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis)
- [Lenis NPM Package](https://www.npmjs.com/package/lenis)

### **Combined Implementation Guides**:
- Next.js with Lenis + GSAP integration tutorials
- React smooth scrolling implementation guides
- Performance optimization techniques

## 🎯 **Best Practices**

1. **Performance**: Always use `will-change` CSS property sparingly
2. **Accessibility**: Respect `prefers-reduced-motion` user preference
3. **Mobile**: Test scroll effects on touch devices
4. **Progressive Enhancement**: Ensure basic functionality without JavaScript
5. **Debugging**: Use ScrollTrigger markers during development

## 🚀 **Next Steps**

The combination of GSAP's powerful animation engine with Lenis's smooth scrolling creates endless possibilities for engaging, performant scroll-based interactions. Start with simple effects and gradually add complexity as needed for your project.