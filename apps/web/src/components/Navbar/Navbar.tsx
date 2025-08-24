"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import HamburgerMenuIcon from "../MenuIcon/HamburgerMenuIcon";
import { MenuIcon } from "../MenuIcon";

const navItems = [
  { id: 0, label: "Home", url: "/" },
  { id: 1, label: "Lobby", url: "/lobby/1" },
  { id: 2, label: "Help", url: "/help" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Click/tap outside to close
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!isOpen) return;
      const target = e.target as Node | null;
      if (navRef.current && target && !navRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown, {
      capture: true,
    });
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((o) => !o);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      ref={navRef}
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Desktop menu - hidden on mobile via CSS */}
      <ol
        className={`${styles.navbarItems} ${styles.desktopMenu}`}
        id="primary-nav"
      >
        {navItems.map((item) => (
          <li key={item.id} className={styles.navbarLink}>
            <Link href={item.url}>{item.label}</Link>
          </li>
        ))}
      </ol>

      {/* Mobile toggle + menu - hidden on desktop via CSS */}
      <div className={styles.mobileContainer}>
        <MenuIcon onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <HamburgerMenuIcon />
        </MenuIcon>
        {/* <button
          className={styles.menuIcon}
          type="button"
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
          onPointerUp={toggleMenu}
        >
          
        </button> */}

        {isOpen && (
          <div className={styles.mobileMenu}>
            <ol id="mobile-nav" className={styles.navbarLinkContainer}>
              {navItems.map((item) => (
                <li key={item.id} className={styles.navbarLink}>
                  <Link href={item.url} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </nav>
  );
}
