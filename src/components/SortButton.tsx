import React from "react";

interface SortButtonProps {
  label: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginRight: "10px",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default SortButton;
