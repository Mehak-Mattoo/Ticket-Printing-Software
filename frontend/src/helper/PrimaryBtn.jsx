import React from "react";

const PrimaryBtn = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  bgColor = "",
  hoverColor = "",
}) => {
  return (
    <button
      className={`${bgColor} font-medium px-4 py-2 rounded-full transition-all ${hoverColor} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
