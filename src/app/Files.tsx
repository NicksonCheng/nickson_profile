import * as React from "react";
import "../styles/files.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
type FilesProps = {
  onFilenameChange: (filename: string) => void;
};
export const Files: React.FC<FilesProps> = ({ onFilenameChange }) => {
  const file = [
    { Icon: RiErrorWarningLine, text: "README.md" },
    {
      Icon: FaReact,
      text: "experience.tsx",
    },
    {
      Icon: FaPython,
      text: "main.py",
    },
  ];
  return (
    <div className="files">
      {file.map((item, index) => (
        <button
          key={index}
          className="file-item"
          onClick={() => {
            onFilenameChange(item.text); // Pass filename to parent
          }}
        >
          <item.Icon />
          {item.text}
        </button>
      ))}
    </div>
  );
};
