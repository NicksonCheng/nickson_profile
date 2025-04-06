import * as React from "react";
import "../../styles/mainContent/tab.scss";

interface TabProps {
  openFiles: string[]; // List of open file names
  activeFile: string; // Currently active file
  onSelectFile: (filename: string) => void; // Function to switch active file
  onCloseFile: (filename: string) => void; // Function to close a file
  className?: string; // Optional additional className
}

export const Tab: React.FC<TabProps> = ({
  openFiles,
  activeFile,
  onSelectFile,
  onCloseFile,
  className = "",
}) => {
  return (
    <div className={`tab-container ${className}`.trim()}>
      {openFiles.map((file) => (
        <div
          key={file}
          className={`file-tab ${file === activeFile ? "active" : ""}`}
          onClick={() => onSelectFile(file)}
        >
          <span className="file-name">{file}</span>
          <button
            className="close-button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent tab switch on close
              onCloseFile(file);
            }}
            title={`Close ${file}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
