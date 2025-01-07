import React, { useState, useEffect } from "react";
import RepoList from "./RepoList";
import SortButton from "./SortButton"
import { Bar } from "react-chartjs-2";

// Mock data
interface Repo {
  id: number;
  name: string;
  stars: number;
  author: string;
  fullName: string;
}

// useEffect(() => {
//   fetch("http://localhost:5000/repositories")
//     .then((res) => res.json())
//     .then((data) => setRepositories(data));
// }, []);

const mockRepos = [
  { id:123,name: "Repo A", stars: 100, fullName: "aaa", author:"bbb" },
  { id:123,name: "Repo B", stars: 250, fullName: "bbb",author:"bbb" },
  { id:123,name: "Repo C", stars: 50, fullName: "ccc",author:"bbb" },
  { id:123,name: "Repo D", stars: 400, fullName: "ddd",author:"bbb" },
];

const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>(mockRepos);

   // Starred repositories (stored as JSON-like data)
   const [starredRepos, setStarredRepos] = useState<Repo[]>([]);

  const handleSort = (order: "asc" | "desc") => {
    const sortedRepos = [...repos].sort((a, b) =>
      order === "asc" ? a.stars - b.stars : b.stars - a.stars
    );
    setRepos(sortedRepos);
  };

  const handleStarRepo = (repo: Repo) => {
    // Check if the repo is already starred
    const isAlreadyStarred = starredRepos.some((r) => r.id === repo.id);
    if (!isAlreadyStarred) {
      setStarredRepos((prev) => [...prev, repo]);
      alert(`${repo.name} has been starred!`);
    } else {
      alert(`${repo.name} is already starred.`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* Key Metrics */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Key Metrics</h2>
        <p>Total Repositories: {repos.length}</p>
        <p>
          Average Stars:{" "}
          {(
            repos.reduce((acc, repo) => acc + repo.stars, 0) /
            repos.length
          ).toFixed(2)}
        </p>
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
          </tr>
        </thead>
        <tbody>
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
                {repo.author}
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
                  ⭐
                </button>
              </td>
            </tr>
          ))}
        </tbody>
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



//   const chartData = {
//     labels: repos.map((repo) => repo.name),
//     datasets: [
//       {
//         label: "Stars",
//         data: repos.map((repo) => repo.stars),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//       // {
//       //   label: "name",
//       //   data: repos.map((repo) => repo.fullName),
//       //   backgroundColor: "rgba(153, 102, 255, 0.6)",
//       // },
//     ],
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//         <SortButton label="Sort Ascending" onClick={() => handleSort("asc")} />
//         <SortButton label="Sort Descending" onClick={() => handleSort("desc")} />
//       </div>

//       <div style={{ marginBottom: "40px" }}>
//         <h2>Repository Metrics</h2>
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: "top",
//               },
//             },
//           }}
//         />
//       </div>

//       <RepoList repos={repos} />
//     </div>
//   );
// };

export default Dashboard;
