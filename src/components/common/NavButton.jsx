import React from "react";

export default function NavButton({ children, onClick, variant = "default" }) {
  const className =
    variant === "primary" ? "nav-auth-btn primary" : "nav-auth-btn";

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}