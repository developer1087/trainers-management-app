import React from "react";
import "./Select.css";

export const Select = ({ options, value, onChange, className = "" }) => {
    if (!Array.isArray(options)) {
      console.error("⚠️ שגיאה: options חייב להיות מערך, אך קיבל:", options);
      return null; // לא להחזיר כלום במקרה של שגיאה
    }
  
    return (
      <select className={`select ${className}`} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  
export const SelectItem = ({ value, children }) => {
    return <option value={value}>{children}</option>;
  };

