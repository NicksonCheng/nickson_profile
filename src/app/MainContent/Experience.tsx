import * as React from "react";
import { BlockWithImage } from "../Components/BlockWithImage";
import "@/styles/mainContent/experience.scss"; // Updated import

interface ExperienceData {
  leftContent: {
    title: string;
    subtitle: string;
    items: string[];
  };
  images: {
    src: string;
    alt: string;
    url: string;
    tooltip?: string;
  }[];
}

export const Experience: React.FC = () => {
  const [experiences, setExperiences] = React.useState<ExperienceData[]>([]);

  React.useEffect(() => {
    fetch("/data/experience.json")
      .then((response) => response.json())
      .then((data: ExperienceData[]) => setExperiences(data))
      .catch((error) =>
        console.error("Error fetching experience data:", error)
      );
  }, []);

  return (
    <div className="experience">
      {experiences.map((exp, index) => (
        <BlockWithImage
          key={index}
          leftContent={exp.leftContent}
          images={exp.images}
        />
      ))}
    </div>
  );
};
