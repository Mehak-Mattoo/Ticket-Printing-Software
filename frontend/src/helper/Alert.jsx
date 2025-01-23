import React from "react";

const Alert = ({ category, title, description }) => {
  let bgColor;
  let borderColor;
  let textColor;

  // Set styles based on category
  switch (category) {
    case "success":
      bgColor = "#d4edda"; // Green background
      borderColor = "#c3e6cb"; // Green border
      textColor = "#155724"; // Dark green text
      break;
    case "error":
      bgColor = "#f8d7da"; // Red background
      borderColor = "#f5c6cb"; // Red border
      textColor = "#721c24"; // Dark red text
      break;
    case "info":
      bgColor = "#d1ecf1"; // Blue background
      borderColor = "#bee5eb"; // Blue border
      textColor = "#0c5460"; // Dark blue text
      break;
    case "warning":
      bgColor = "#fff3cd"; // Yellow background
      borderColor = "#ffeeba"; // Yellow border
      textColor = "#856404"; // Dark yellow text
      break;
    default:
      bgColor = "#f8f9fa"; // Default gray background
      borderColor = "#dae0e5"; // Default gray border
      textColor = "#383d41"; // Default dark text
      break;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "15px",
        border: `1px solid ${borderColor}`,
      }}
    >
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
};

export default Alert;
