// IconButton.tsx
import React from 'react';
import Image from 'next/image';

interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <Image
        src={icon}
        alt={alt}
      />
    </button>
  );
};