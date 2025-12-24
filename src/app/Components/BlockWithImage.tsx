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
    video?: boolean;
  }[];
  className?: string;
  layout?: "horizontal" | "vertical" | "reverse";
  height?: string;
}

export const BlockWithImage: React.FC<BlockWithImageProps> = ({
  leftContent,
  images,
  className = "",
  layout = "horizontal",
  height = "25em",
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

      {/* 右邊區塊 */}
      <div className="right-section">
        {images.map((media, index) => (
          <Link href={media.url} key={index}>
            <div className="image-wrapper">
              {media.video ? (
                <video
                  className="block-image"
                  width={400}
                  height={288}
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={media.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  width={400}
                  height={288}
                  src={media.src}
                  alt={media.alt}
                  className="block-image"
                  quality={75}
                />
              )}

              <span className="image-tooltip">
                {media.tooltip || media.alt}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
