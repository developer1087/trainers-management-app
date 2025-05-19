import React, { forwardRef } from "react";
import "./Input.css";

export const Input = forwardRef(({ type = "text", value, onChange, placeholder = "", className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`input ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
});

