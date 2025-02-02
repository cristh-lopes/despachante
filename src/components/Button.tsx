import React from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  Icon?: IconType;
};

const buttonStyles = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export default function Button({
  onClick,
  disabled,
  children,
  className = "",
  variant = "primary",
  Icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 p-2 rounded transition disabled:bg-gray-400 ${buttonStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}
