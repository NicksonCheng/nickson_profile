// IconButton.tsx
import React from "react";
import Image from "next/image";
import { LuFiles } from "react-icons/lu";
interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  isActive: boolean;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  isActive,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:opacity-80 transition-opacity flex items-center relative ${
        isActive ? "bg-white" : "bg-transparent"
      } ${className}`}
    >
      <LuFiles size={32} color="red" />
    </button>
  );
};
