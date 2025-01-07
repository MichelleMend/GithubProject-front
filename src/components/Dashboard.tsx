import React, { useState, useEffect } from "react";
import SortButton from "./SortButton";
import { Bar } from "react-chartjs-2";
import { Link } from 'react-router-dom';

// Mock data
interface Repo {
  id: number;
  name: string;
  fullName: string;
  authorName: User;
  stars: number;
  isFavorite: boolean;
  url: string;
}

interface User {
  login: string
}


const Dashboard: React.FC = () => {
  
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [starredRepos, setStarredRepos] = useState<Repo[]>([]);
  const PORT = 5000;
  
  useEffect(() => {
    fetch(`http://localhost:${PORT}/desc`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        let data = response.json();
        return data;
      })
      .then((data) => {
        let result: Repo[] = data?.reposToShow ? data?.reposToShow : [];
        setRepos(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repositories:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSort = (order: "asc" | "desc") => {
    const sortedRepos = [...repos].sort((a, b) =>
      order === "asc" ? a.stars - b.stars : b.stars - a.stars
    );
    setRepos(sortedRepos);
  };

  const handleStarRepo = (repo: Repo) => {
    // Check if the repo is already starred
    const isAlreadyStarred = repo.isFavorite;
    if (!isAlreadyStarred) {
      setStarredRepos((prev) => [...prev, repo]);
      repo.isFavorite = true;
      alert(`${repo.name} has been starred!`);
    } else {
      repo.isFavorite = false;
      const repoToRemove = starredRepos.find((element => element.id === repo.id))
      if (repoToRemove) {
        const index = starredRepos.indexOf(repoToRemove);
        starredRepos.splice(index, 1);
      }
      alert(`${repo.name} is removed from favorites`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* Key Metrics */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Key Metrics</h2>
        <p>Total Repositories: {repos.length}</p>
      </div>

      {/* Sort Button */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
//         <SortButton label="Sort Ascending" onClick={() => handleSort("asc")} />
//         <SortButton label="Sort Descending" onClick={() => handleSort("desc")} />
//       </div>
      </div>

      {/* Repository Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stars</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Full Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Owner
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Link</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Add to Favorites</th>
          </tr>
        </thead>
        {<tbody>
          {repos.map((repo) => (
            <tr key={repo.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {repo.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {repo.stars}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {repo.fullName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {repo.authorName?.login || ""}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {repo.url}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleStarRepo(repo)}
                  style={{
                    backgroundColor: "#FFD700",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                </button>
              </td>
            </tr>
          ))}
        </tbody>}
      </table>
      {/* Starred Repositories */}
      <div style={{ marginTop: "30px" }}>
        <h2>Starred Repositories</h2>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {JSON.stringify(starredRepos, null, 2)}
        </pre>
      </div>
    </div>
  );
};


export default Dashboard;
