"use client";
import * as React from "react";

interface IconButtonProps {
  svgContent: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  svgContent,
  className = "",
}) => {
  return (
    <button
      className={`p-2 hover:opacity-80 transition-opacity ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
