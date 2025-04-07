// BlockWithImage.tsx
import * as React from "react";
import Image from "next/image";
import "@/styles/components/blockWithImage.scss"; // Updated import

interface BlockWithImageProps {
  leftContent: {
    title: string;
    subtitle?: string;
    items?: string[];
    description?: string;
  };
  images: {
    src: string;
    alt: string;
    tooltip?: string;
  }[];
  url: "https://official.ainimal.io/";
  className?: string;
}

export const BlockWithImage: React.FC<BlockWithImageProps> = ({
  leftContent,
  images,
  className = "",
}) => {
  return (
    <div className={`block-with-image ${className}`}>
      <div className="left-section">
        <h2 className="title">{leftContent.title}</h2>
        {leftContent.subtitle && (
          <h3 className="subtitle">{leftContent.subtitle}</h3>
        )}
        {leftContent.items && (
          <ul className="items-list">
            {leftContent.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {leftContent.description && (
          <p className="description">{leftContent.description}</p>
        )}
      </div>
      <div className="right-section">
        {images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <Image
              width={400}
              height={288}
              src={image.src}
              alt={image.alt}
              className="block-image"
              quality={75}
            />
            <span className="image-tooltip">{image.tooltip || image.alt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
