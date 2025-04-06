import * as React from "react";
import "../styles/files.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaJs } from "react-icons/fa";

type FilesProps = {
  onFilenameChange: (filename: string) => void;
  selectedFile: string;
  className?: string; // 添加 className 作為可選屬性
};

export const Files: React.FC<FilesProps> = ({
  onFilenameChange,
  selectedFile,
  className,
}) => {
  const file = [
    { Icon: RiErrorWarningLine, text: "README.md" },
    {
      Icon: FaReact,
      text: "experience.tsx",
    },
    {
      Icon: FaPython,
      text: "projects.py",
    },
    {
      Icon: FaFilePdf,
      text: "thesis.pdf",
    },
  ];

  return (
    <div className={`files ${className || ""}`}>
      {/* 合併默認的 'files' 與傳入的 className */}
      {file.map((item, index) => (
        <button
          key={index}
          className={`file-item ${selectedFile === item.text ? "active" : ""}`}
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
