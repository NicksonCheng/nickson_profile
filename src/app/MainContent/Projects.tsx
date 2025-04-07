import React from "react";
import axios from "axios";
import { GoRepo, GoDotFill, GoStar } from "react-icons/go";
import { BsChevronDoubleDown } from "react-icons/bs";
import Link from "next/link";
import { BlockWithImage } from "../Components/BlockWithImage";
import "@/styles/mainContent/projects.scss";

interface Repo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  visibility: string;
}

interface ProjectData {
  leftContent: {
    title: string;
    subtitle: string;
    items: string[];
  };
  images: {
    src: string;
    alt: string;
  }[];
  status: "ongoing" | "finished";
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [projects, setProjects] = React.useState<ProjectData[]>([]);
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

    Promise.all([
      axios.get<Repo[]>(
        "https://api.github.com/users/NicksonCheng/repos?sort=pushed&per_page=40"
      ),
      fetch("/data/projects.json").then((response) => response.json()),
    ])
      .then(([repoResponse, projectsData]) => {
        const allRepos = repoResponse.data;
        const pinnedRepos = allRepos.filter((repo) =>
          pinned.includes(repo.name)
        );
        setRepos(pinnedRepos);
        setProjects(projectsData as ProjectData[]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const languageColors: { [key: string]: string } = {
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    TypeScript: "#2b7489",
  };

  const repoUrls: { [key: string]: string } = {
    AIcup2024_RAG: "https://example.com/AIcup2024_RAG",
    nickson_profile: "https://example.com/nickson_profile",
    web_service: "https://example.com/web_service",
    MovieBot: "https://example.com/MovieBot",
    leecode: "https://example.com/leecode",
    Sudoku: "https://example.com/Sudoku",
  };

  const ongoingProjects = projects.filter((p) => p.status === "ongoing");
  const finishedProjects = projects.filter((p) => p.status === "finished");

  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="experience-projects">
        {ongoingProjects.length > 0 && (
          <>
            <h2 className="divider">Ongoing Projects</h2>
            {ongoingProjects.map((project, index) => (
              <BlockWithImage
                key={index}
                leftContent={project.leftContent}
                images={project.images}
              />
            ))}
          </>
        )}
        {finishedProjects.length > 0 && (
          <>
            <h2 className="divider">Finished Projects</h2>
            {finishedProjects.map((project, index) => (
              <BlockWithImage
                key={index}
                leftContent={project.leftContent}
                images={project.images}
              />
            ))}
          </>
        )}
      </div>
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
