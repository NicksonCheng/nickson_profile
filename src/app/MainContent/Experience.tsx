import * as React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import "../../styles/mainContent/experience.scss";

interface ExperienceItem {
  teamName: string;
  position: string;
  progress: string[];
  imageSrc: string;
  imageAlt: string;
  url: string; // Add URL property to link to websites
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      teamName: "AINIMAL Project",
      position: "Software Engineer",
      progress: [
        "Developed a responsive UI for pet adoption platform",
        "Integrated real-time chat for user-animal interaction",
        "Designed playful animations for user engagement",
      ],
      imageSrc: "/images/ainimal.png",
      imageAlt: "AINIMAL Project Illustration",
      url: "https://official.ainimal.io/", // Example URL
    },
    {
      teamName: "KID Lab",
      position: "Machine Learning/Deep Learning Engineer",
      progress: [
        "Developed RESTful APIs with Node.js and Express",
        "Integrated MongoDB for data persistence",
        "Implemented authentication with JWT",
      ],
      imageSrc: "/images/kidlab.png",
      imageAlt: "Team Beta System Design",
      url: "https://kid.ee.ncku.edu.tw/", // Example URL
    },
  ];

  return (
    <div className="experience">
      {experiences.map((exp, index) => (
        <div key={index} className="experience-block">
          <div className="left-section">
            <h2 className="team-name">{exp.teamName}</h2>
            <h3 className="position">{exp.position}</h3>
            <ul className="progress-list">
              {exp.progress.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="right-section">
            <Link href={exp.url} target="_blank" rel="noopener noreferrer">
              <div className="image-wrapper">
                <Image
                  width={400}
                  height={288}
                  src={exp.imageSrc}
                  alt={exp.imageAlt}
                  className="experience-image"
                  priority={index === 0}
                  quality={75}
                />
                <span className="image-tooltip">Click to visit website</span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
