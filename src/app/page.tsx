"use client";
import * as React from "react";
import { About } from "./MainContent/About";
import { Experience } from "./MainContent/Experience";
import { Projects } from "./MainContent/Projects";
import { Thesis } from "./MainContent/Thesis";
import { TopMenuBar } from "./TopMenuBar";
import { Files } from "./Files";
import { SideNavigation } from "./SideNavigation";
import { FloatButton } from "antd";
import { Tab } from "./MainContent/Tab"; // Assuming Tab is in MainContent folder
import {
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "../styles/page.scss";

export default function Home() {
  const mainpage = {
    "README.md": <About />,
    "experience.tsx": <Experience />,
    "projects.py": <Projects />,
    "thesis.pdf": <Thesis />,
  };

  const [openFiles, setOpenFiles] = React.useState<string[]>(["README.md"]); // Track open files
  const [activeFile, setActiveFile] = React.useState<string>("README.md"); // Current active file
  const [showFiles, setShowFiles] = React.useState(false);
  const [showTools, setShowTools] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile);
    setShowFiles(!checkMobile());
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilenameChange = (filename: string) => {
    if (filename in mainpage && !openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]); // Add new file to open tabs
    }
    setActiveFile(filename); // Switch to clicked file
  };

  const handleIconChange = (icon_name: string) => {
    switch (icon_name) {
      case "file":
        setShowFiles((prev) => !prev);
        break;
      case "account":
        setActiveFile("README.md");
        if (!openFiles.includes("README.md")) {
          setOpenFiles([...openFiles, "README.md"]);
        }
        break;
      default:
        break;
    }
  };

  const handleCloseFile = (filename: string) => {
    const newOpenFiles = openFiles.filter((file) => file !== filename);
    setOpenFiles(newOpenFiles);
    if (activeFile === filename) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[0] : "README.md"); // Switch to first open file or default
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <TopMenuBar />
        <div className="page-main">
          {(!isMobile || (isMobile && showTools)) && (
            <SideNavigation
              onClickIcon={handleIconChange}
              className={`side-navigation ${
                isMobile && showTools ? "visible" : ""
              }`}
            />
          )}
          {showFiles && (
            <Files
              onFilenameChange={handleFilenameChange}
              selectedFile={activeFile}
              className={`files ${isMobile && showFiles ? "visible" : ""}`}
            />
          )}
          <div className="content-wrapper">
            <Tab
              openFiles={openFiles}
              activeFile={activeFile}
              onSelectFile={setActiveFile}
              onCloseFile={handleCloseFile}
            />
            <div className="content-section">
              {mainpage[activeFile as keyof typeof mainpage]}
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <FloatButton.Group
          trigger="click"
          type="primary"
          className="float-button-group"
          icon={<CustomerServiceOutlined />}
        >
          <FloatButton
            icon={<QuestionCircleOutlined />}
            onClick={() => {
              setShowTools((prev) => !prev);
              setShowFiles(false);
            }}
          />
          <FloatButton
            onClick={() => {
              setShowFiles((prev) => !prev);
              setShowTools(false);
            }}
          />
        </FloatButton.Group>
      )}
    </div>
  );
}
