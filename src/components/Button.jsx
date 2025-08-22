import React from 'react';

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  hoverColor = "hover:bg-blue-700",
  focusColor = "focus:outline-none focus:ring-2 focus:ring-blue-500",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${hoverColor} ${focusColor} ${className} transition-all duration-300`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
