import * as React from "react";
import { BlockWithImage } from "../Components/BlockWithImage";
import "@/styles/mainContent/thesis.scss";

interface ThesisData {
  leftContent: {
    title: string;
    description: string;
  };
  images: {
    src: string;
    alt: string;
    url: string;
  }[];
}

export const Thesis: React.FC = () => {
  const [thesisData, setThesisData] = React.useState<ThesisData | null>(null);

  React.useEffect(() => {
    fetch("/data/thesis.json")
      .then((response) => response.json())
      .then((data: ThesisData) => setThesisData(data))
      .catch((error) => console.error("Error fetching thesis data:", error));
  }, []);

  if (!thesisData) return <div>Loading...</div>;

  return (
    <div className="thesis">
      <BlockWithImage
        layout="vertical"
        leftContent={thesisData.leftContent}
        images={thesisData.images}
        height="35em"
      />
    </div>
  );
};
