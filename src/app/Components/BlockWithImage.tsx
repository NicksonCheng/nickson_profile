import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
    url: string;
    tooltip?: string;
  }[];
  className?: string;
  layout?: "horizontal" | "vertical" | "reverse"; // ✅ 新增
}

export const BlockWithImage: React.FC<BlockWithImageProps> = ({
  leftContent,
  images,
  className = "",
  layout = "horizontal", // ✅ 預設左右排列
}) => {
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current && rightRef.current) {
        const rightHeight = rightRef.current.offsetHeight;
        leftRef.current.style.maxHeight = `${rightHeight}px`;
      }
    };

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (rightRef.current) observer.observe(rightRef.current);
    updateHeight();

    return () => {
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, [images]);

  return (
    <div className={`block-with-image ${layout} ${className}`}>
      {/* 左邊區塊 */}
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

      {/* 右邊區塊（圖片區） */}
      <div ref={rightRef} className="right-section">
        {images.map((image, index) => (
          <Link href={image.url} key={index}>
            <div className="image-wrapper">
              <Image
                width={400}
                height={288}
                src={image.src}
                alt={image.alt}
                className="block-image"
                quality={75}
              />
              <span className="image-tooltip">
                {image.tooltip || image.alt}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
