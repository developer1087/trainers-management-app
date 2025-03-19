import React from "react";
import "./Input.css";

export const Input = ({ type = "text", value, onChange, placeholder = "", className = "" }) => {
  return (
    <input
      className={`input ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

