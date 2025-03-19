import React from "react";
import "./Button.css";

export const Button = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

