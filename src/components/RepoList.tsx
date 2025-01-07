import React from "react";

interface Repo {
  id: string,
  name: string;
  stars: number;
  fullName: string;
  author: string;
}

interface RepoListProps {
  repos: Repo[];
}

// const RepoList: React.FC<RepoListProps> = ({ repos }) => {
//   return (
//     <div>
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ccc", padding: "10px" }}>Name</th>
//             <th style={{ border: "1px solid #ccc", padding: "10px" }}>Stars</th>
//             <th style={{ border: "1px solid #ccc", padding: "10px" }}>full Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {repos.map((repo, index) => (
//             <tr key={index}>
//               <td style={{ border: "1px solid #ccc", padding: "10px" }}>
//                 {repo.name}
//               </td>
//               <td style={{ border: "1px solid #ccc", padding: "10px" }}>
//                 {repo.stars}
//               </td>
//               <td style={{ border: "1px solid #ccc", padding: "10px" }}>
//                 {repo.fullName}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RepoList;
