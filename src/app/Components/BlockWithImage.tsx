import * as React from "react";
import Image from "next/image";
import "@/styles/components/blockWithImage.scss";

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
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (leftRef.current && rightRef.current) {
      const rightHeight = rightRef.current.offsetHeight;
      leftRef.current.style.maxHeight = `${rightHeight}px`;
    }
  }, [images]); // Re-run when images change

  return (
    <div className={`block-with-image ${className}`}>
      <div ref={leftRef} className="left-section">
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
      <div ref={rightRef} className="right-section">
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
