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
      <h1>
        Metapath-Free Heterogeneous Network Embedding via Heterogeneous
        Adjacency Matrix Reconstruction Based Mask Graph Autoencoders and
        Semantic Relation Aggregation
      </h1>
      <a href="https://dsaa.ieee.org/2025/technical-program/">
        Accepted paper at the IEEE/ACM International Conference on Data Science
        and Advanced Analytics (DSAA 2025), with an acceptance rate of 37.61%.
      </a>
      <BlockWithImage
        layout="vertical"
        leftContent={thesisData.leftContent}
        images={thesisData.images}
      />
    </div>
  );
};
