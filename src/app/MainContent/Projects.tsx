import React from "react";
import axios from "axios";
import { GoRepo, GoDotFill, GoStar } from "react-icons/go"; // Icons from react-icons
import "../../styles/mainContent/projects.scss"; // We'll create this CSS file

interface Repo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  visibility: string; // e.g., "public"
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

  // Language colors (matching GitHub's style)
  const languageColors: { [key: string]: string } = {
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    TypeScript: "#2b7489",
    // Add more languages as needed
  };

  return (
    <div className="projects">
      <h1>Projects</h1>
      <div className="project-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          repos.map((repo, index) => (
            <div key={index} className="repo-card">
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
          ))
        )}
      </div>
    </div>
  );
};
