import React from "react";
import "./Select.css";

export const Select = ({ options, value, onChange, onValueChange, children, className = "" }) => {
  // Handle both options array and children pattern
  if (children) {
    // When using with SelectItem children
    return (
      <select 
        className={`select ${className}`} 
        value={value} 
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
      >
        {children}
      </select>
    );
  } else if (Array.isArray(options)) {
    // When using with options prop
    return (
      <select 
        className={`select ${className}`} 
        value={value} 
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option.key || option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    console.error("⚠️ שגיאה: חייב לספק או options כמערך או children, אך קיבל:", options);
    return null;
  }
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};