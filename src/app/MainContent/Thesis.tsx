import * as React from "react";
import Image from "next/image";
import "../../styles/mainContent/thesis.scss";

export const Thesis: React.FC = () => {
  const thesisData = {
    title: "My Thesis",
    introduction:
      "This thesis explores innovative approaches to [your topic]. It focuses on designing and implementing a system that [brief goal]. Key contributions include [key point 1], [key point 2], and [key point 3].",
    images: [
      {
        src: "/images/introduction.png",
        alt: "Thesis Introduction Diagram",
      },
      {
        src: "/images/architecture.png",
        alt: "System Architecture Diagram",
      },
      {
        src: "/images/architecture2.png",
        alt: "Alternative Architecture Diagram",
      },
    ],
  };

  return (
    <div className="thesis">
      <h1>{thesisData.title}</h1>
      <div className="thesis-content">
        <div className="left-section">
          <h2>Introduction</h2>
          <p>{thesisData.introduction}</p>
        </div>
        <div className="right-section">
          {thesisData.images.map((image, index) => (
            <div key={index} className="image-wrapper">
              <Image
                width={400}
                height={288}
                src={image.src}
                alt={image.alt}
                className="thesis-image"
                quality={75}
              />
              <span className="image-tooltip">{image.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
