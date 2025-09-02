import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../../styles/theme";
import logo from "../../../assets/images/brand-logo/logo1.png";
import { triggerViralLoopsPopup } from "../../../utils/viralLoops";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin: 0 20px;
  max-width: calc(1400px + 40px);

  @media (max-width: calc(1400px + 80px)) {
    margin: 0 20px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 0 10px;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px 24px;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    height: 40px;
    width: auto;
    object-fit: contain;

    @media (max-width: ${theme.breakpoints.tablet}) {
      height: 36px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      height: 32px;
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
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const MenuLine = styled.span`
  width: 25px;
  height: 2px;
  background: ${theme.colors.text};
  transition: all ${theme.transitions.fast};
  display: block;

  &:nth-child(1) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(45deg) translateY(6px)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${(props) => (props.$isOpen ? "0" : "1")};
  }

  &:nth-child(3) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(-45deg) translateY(-6px)" : "none"};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 90px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  padding: 24px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 999;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

const MobileNavLink = styled(motion.a)`
  color: ${theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  transition: color ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Naphome", href: "#naphome" },
    { label: "The App", href: "#the-app" },
    { label: "Naptick-App", href: "/naptick-app" },
    { label: "Our Story", href: "#our-story" },
    { label: "Blog", href: "/blog" },
    { label: "Investors", href: "/investors" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Handle route navigation
      window.location.href = href;
    }
    setMobileMenuOpen(false);
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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ order: 1, marginLeft: "0", marginRight: "auto" }}
          >
            <img src={logo} alt="Naptick Logo" />
          </Logo>

          <Navigation
            style={{
              flex: 1,
              order: 2,
              justifyContent: "center",
              margin: "0 40px",
            }}
          >
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
            style={{ order: 3, marginRight: "0", marginLeft: "auto" }}
          >
            Join the Waitlist
          </PreorderButton>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{ order: 4 }}
          >
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
          </MobileMenuButton>
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
