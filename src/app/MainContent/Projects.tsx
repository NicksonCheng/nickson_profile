import * as React from "react";
import axios from "axios";
import "../../styles/mainContent/main_content.scss";

interface RepoOwner {
  login: string;
  avatar_url: string;
}

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: RepoOwner;
}

export const Projects: React.FC = () => {
  const [repos, setRepos] = React.useState<Repo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get<Repo[]>(
        "https://api.github.com/users/NicksonCheng/repos?sort=pushed&per_page=6"
      )
      .then((response) => {
        // Here we can filter repositories based on certain criteria (e.g., stars or recent activity)
        // Since GitHub API does not return a 'pinned' field, we'll just use the first few repos
        const pinnedRepos = response.data.slice(0, 6); // Example: Get the first 6 repos
        console.log(pinnedRepos);
        setRepos(pinnedRepos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-content">
      <div className="content-section">
        <h2 className="section-title">My Projects</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="projects-container">
            {repos.map((repo) => (
              <div key={repo.name} className="project-card">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="avatar"
                />
                <h3 className="project-title">{repo.name}</h3>
                <p className="project-description">{repo.description}</p>
                <div className="project-details">
                  <span className="language">{repo.language}</span>
                  <span className="stars">{repo.stargazers_count} Stars</span>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
