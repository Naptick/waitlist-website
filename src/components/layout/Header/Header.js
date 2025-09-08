import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "../../../styles/theme";
import logo from "../../../assets/images/brand-logo/logo1.png";
import { triggerViralLoopsPopup } from "../../../utils/viralLoops";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1400px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: 5px;
    left: 5px;
    right: 5px;
    border-radius: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 16px;
    background: rgba(26, 26, 26, 0.98);
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 12px 16px;
    justify-content: space-between;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 12px;
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    height: 40px;
    width: auto;
    object-fit: contain;

    @media (max-width: ${theme.breakpoints.tablet}) {
      height: 32px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      height: 28px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  margin: 0 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
`;

const NavLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 400;
  transition: color ${theme.transitions.fast};
  cursor: pointer;
  position: relative;
  letter-spacing: 0.3px;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const PreorderButton = styled(motion.button)`
  padding: 8px 20px;
  background: #ff7640;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all ${theme.transitions.medium};
  letter-spacing: 0.3px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 118, 64, 0.3);
  margin-left: auto;

  &:hover {
    background: #e85d2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 118, 64, 0.4);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;  // Hide on tablet/mobile, show in mobile menu
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
    justify-content: center;
  }
`;

const MenuLine = styled.span`
  width: 22px;
  height: 2px;
  background: ${theme.colors.text};
  transition: all ${theme.transitions.fast};
  display: block;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(45deg) translateY(5px)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${(props) => (props.$isOpen ? "0" : "1")};
    transform: ${(props) =>
      props.$isOpen ? "scaleX(0)" : "scaleX(1)"};
  }

  &:nth-child(3) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(-45deg) translateY(-5px)" : "none"};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 70px;
  left: 10px;
  right: 10px;
  background: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 999;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 60px;
    left: 5px;
    right: 5px;
    padding: 16px;
    border-radius: 12px;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 16px;
  }
`;

const MobileNavLink = styled(motion.a)`
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  transition: color ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: #ff7640;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    // { label: "Naphome", href: "#naphome" },
    // { label: "The App", href: "#the-app" },
    // { label: "Our Story", href: "#our-story" },
    // { label: "Blog", href: "/blog" },
    // { label: "Investors", href: "/investors" },
    // { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      // Check if we're on a different page
      if (location.pathname !== '/') {
        // Navigate to home page first, then scroll to section
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Same page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Handle route navigation
      window.location.href = href;
    }
    setMobileMenuOpen(false);
  };
  
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      navigate('/');
      // After navigation, scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <HeaderContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <HeaderContent>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
          >
            <img src={logo} alt="Naptick Logo" />
          </Logo>

          <Navigation>
            <NavLinks>
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>
          </Navigation>

          <PreorderButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerViralLoopsPopup}
          >
            Join the Waitlist
          </PreorderButton>

          {/* <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
          </MobileMenuButton> */}
        </HeaderContent>
      </HeaderContainer>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavLinks>
            {navItems.map((item, index) => (
              <MobileNavLink
                key={index}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <PreorderButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerViralLoopsPopup}
              style={{ marginTop: "10px" }}
            >
              Join the Waitlist
            </PreorderButton>
          </MobileNavLinks>
        </MobileMenu>
      )}
    </>
  );
};

export default Header;
