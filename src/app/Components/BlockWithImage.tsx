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
    url?: string;
  };
  images: {
    src: string;
    alt: string;
    url: string;
    tooltip?: string;
  }[];
  className?: string;
  layout?: "horizontal" | "vertical" | "reverse"; // ✅ 新增
  height?: string; // ✅ 新增：可自定義高度，預設 25em
}

export const BlockWithImage: React.FC<BlockWithImageProps> = ({
  leftContent,
  images,
  className = "",
  layout = "horizontal", // ✅ 預設左右排列
  height = "25em", // ✅ 預設高度
}) => {
  return (
    <div
      className={`block-with-image ${layout} ${className}`}
      style={{ "--block-height": height } as React.CSSProperties}
    >
      {/* 左邊區塊 */}
      <div className="left-section">
        <h2 className="title">{leftContent.title}</h2>
        {leftContent.subtitle && (
          <Link href={leftContent.url || "#"}>
            <h3 className="subtitle">{leftContent.subtitle}</h3>
          </Link>
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
      <div className="right-section">
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
