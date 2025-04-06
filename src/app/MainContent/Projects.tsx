import React from "react";
import axios from "axios";
import { GoRepo, GoDotFill, GoStar } from "react-icons/go";
import { BsChevronDoubleDown } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link"; // For repo URLs
import "../../styles/mainContent/projects.scss";

interface Repo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  visibility: string;
}

interface ExperienceItem {
  teamName: string;
  position: string;
  progress: string[];
  imageSrc: string;
  imageAlt: string;
  status: "ongoing" | "finished"; // Add status for divider
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const hasRun = React.useRef(false);

  React.useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const pinned = [
      "AIcup2024_RAG",
      "nickson_profile",
      "web_service",
      "MovieBot",
      "leecode",
      "Sudoku",
    ];

    axios
      .get<Repo[]>(
        "https://api.github.com/users/NicksonCheng/repos?sort=pushed&per_page=40"
      )
      .then((response) => {
        const allRepos = response.data;
        const pinnedRepos = allRepos.filter((repo) =>
          pinned.includes(repo.name)
        );
        console.log(pinnedRepos);
        setRepos(pinnedRepos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  const languageColors: { [key: string]: string } = {
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    TypeScript: "#2b7489",
  };

  const exampleProjects: ExperienceItem[] = [
    {
      teamName: "Project 1",
      position: "Developer",
      progress: [
        "Built a cool feature",
        "Optimized performance",
        "Added user-friendly UI",
      ],
      imageSrc: "/images/project1.png",
      imageAlt: "Project 1 Illustration",
      status: "ongoing",
    },
    {
      teamName: "Project 2",
      position: "Lead Engineer",
      progress: [
        "Designed system architecture",
        "Integrated APIs",
        "Led a small team",
      ],
      imageSrc: "/images/project2.png",
      imageAlt: "Project 2 Illustration",
      status: "finished",
    },
  ];

  // Add URLs to pinned repos (example.com placeholders)
  const repoUrls: { [key: string]: string } = {
    AIcup2024_RAG: "https://example.com/AIcup2024_RAG",
    nickson_profile: "https://example.com/nickson_profile",
    web_service: "https://example.com/web_service",
    MovieBot: "https://example.com/MovieBot",
    leecode: "https://example.com/leecode",
    Sudoku: "https://example.com/Sudoku",
  };

  const ongoingProjects = exampleProjects.filter((p) => p.status === "ongoing");
  const finishedProjects = exampleProjects.filter(
    (p) => p.status === "finished"
  );

  return (
    <div className="projects">
      <h1>Projects</h1>
      {/* Experience-style projects with Ongoing/Finished divider */}
      <div className="experience-projects">
        {ongoingProjects.length > 0 && (
          <>
            <h2 className="divider">Ongoing Projects</h2>
            {ongoingProjects.map((project, index) => (
              <div key={index} className="experience-block">
                <div className="left-section">
                  <h2 className="team-name">{project.teamName}</h2>
                  <h3 className="position">{project.position}</h3>
                  <ul className="progress-list">
                    {project.progress.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="right-section">
                  <div className="image-wrapper">
                    <Image
                      width={400}
                      height={288}
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      className="experience-image"
                      quality={75}
                    />
                    <span className="image-tooltip">Project Image</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {finishedProjects.length > 0 && (
          <>
            <h2 className="divider">Finished Projects</h2>
            {finishedProjects.map((project, index) => (
              <div key={index} className="experience-block">
                <div className="left-section">
                  <h2 className="team-name">{project.teamName}</h2>
                  <h3 className="position">{project.position}</h3>
                  <ul className="progress-list">
                    {project.progress.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="right-section">
                  <div className="image-wrapper">
                    <Image
                      width={400}
                      height={288}
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      className="experience-image"
                      quality={75}
                    />
                    <span className="image-tooltip">Project Image</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* GitHub Projects Divider */}
      <h2 className="divider">GitHub Projects</h2>
      <div className="project-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          repos.map((repo, index) => (
            <Link
              key={index}
              href={repoUrls[repo.name] || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="repo-card">
                <div className="repo-header">
                  <GoRepo className="repo-icon" />
                  <h3 className="repo-name">{repo.name}</h3>
                  <span className="repo-visibility">
                    {repo.visibility || "Public"}
                  </span>
                </div>
                <p className="repo-description">{repo.description || ""}</p>
                <div className="repo-footer">
                  {repo.language && (
                    <span className="repo-language">
                      <GoDotFill
                        className="language-dot"
                        style={{
                          color: languageColors[repo.language] || "#ccc",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-stars">
                    <GoStar className="star-icon" />
                    {repo.stargazers_count || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <a className="more" href="https://github.com/NicksonCheng">
        <span>More</span>
        <BsChevronDoubleDown size={32} />
      </a>
    </div>
  );
};
