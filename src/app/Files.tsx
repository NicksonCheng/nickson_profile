import * as React from "react";
import "@/styles/files.scss";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { SiOverleaf } from "react-icons/si";
import { confirmAlert } from "react-confirm-alert";
import { Alert } from "./Components/Alert";
import { downloadFile } from "@/utils/utils";
// import { FaJs } from "react-icons/fa";

type FilesProps = {
  onFilenameChange: (filename: string) => void;
  selectedFile: string;
  isMobile: boolean;
  className?: string; // 添加 className 作為可選屬性
};

export const Files: React.FC<FilesProps> = ({
  onFilenameChange,
  selectedFile,
  isMobile,
  className,
}) => {
  const file = [
    { Icon: RiErrorWarningLine, text: "README.md" },
    { Icon: FaReact, text: "experience.tsx" },
    { Icon: FaPython, text: "projects.py" },
    { Icon: SiOverleaf, text: "thesis.tex" },
    { Icon: FaFilePdf, text: "resume.pdf", download: true },
  ];
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseFiles = () => {
    onFilenameChange("none");
  };

  const handleFileClick = (file: { text: string; download?: boolean }) => {
    if (file.download) {
      setOpenAlert(true);
    } else onFilenameChange(file.text); // Pass filename to parent
  };
  const handleDownloadClick = (download: boolean) => {
    if (download) {
      downloadFile("/data/resume.pdf", "resume.pdf");
    }
    setOpenAlert(false);
  };
  return (
    <div className={`files ${className || ""}`}>
      <Alert
        isOpen={openAlert}
        mode="confirm"
        title="Download Nickson's Resume"
        message="Do you wanna download my resume ?"
        onConfirm={() => handleDownloadClick(true)}
        onCancel={() => handleDownloadClick(false)}
      />
      {/* 合併默認的 'files' 與傳入的 className */}
      {isMobile && (
        <button className="close" onClick={handleCloseFiles}>
          x
        </button>
      )}
      {file.map((item, index) => (
        <button
          key={index}
          className={`file-item ${selectedFile === item.text ? "active" : ""}`}
          onClick={() => handleFileClick(item)}
        >
          <item.Icon />
          {item.text}
        </button>
      ))}
    </div>
  );
};
