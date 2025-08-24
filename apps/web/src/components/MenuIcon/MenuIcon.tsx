"use client";

import React from "react";
import styles from "./MenuIcon.module.css";

type MenuIconProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

const MenuIcon: React.FC<MenuIconProps> = ({
  onClick,
  children = "☰",
  className = "",
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const button = e.currentTarget;

    // Get button dimensions and click position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // Create ripple element
    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Add ripple to button
    button.appendChild(ripple);

    // Remove ripple after animation completes
    window.setTimeout(() => {
      ripple.remove();
    }, 400);

    // Call the passed onClick handler if provided
    onClick?.(e);
  };

  return (
    <button
      className={[styles.menuIcon, className].filter(Boolean).join(" ")}
      onPointerUp={handleClick}
      type="button"
      aria-label="Menu"
    >
      {children}
    </button>
  );
};

export default MenuIcon;
