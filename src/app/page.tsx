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
import { Tab } from "./MainContent/Tab";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "@/styles/page.scss";
import { TbNavigationFilled } from "react-icons/tb";
import { Terminal } from "./Terminal";

export default function Home() {
  const mainpage = {
    "README.md": <About />,
    "experience.tsx": <Experience />,
    "projects.py": <Projects />,
    "thesis.tex": <Thesis />,
  };

  const [openFiles, setOpenFiles] = React.useState<string[]>(["README.md"]);
  const [activeFile, setActiveFile] = React.useState<string>("README.md");
  const [showFiles, setShowFiles] = React.useState(false);
  const [showTools, setShowTools] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showTerminal, setShowTerminal] = React.useState(true); // Will be set in useEffect
  const [clearTerminal, setClearTerminal] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    const mobile = checkMobile();
    setIsMobile(mobile);
    setShowFiles(!mobile);
    setShowTerminal(!mobile); // Default to closed on mobile, open on desktop
    const handleResize = () => {
      const newMobile = checkMobile();
      setIsMobile(newMobile);
      setShowFiles(!newMobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilenameChange = (filename: string) => {
    if (filename === "none") {
      setShowFiles(false);
      return;
    }
    if (filename in mainpage && !openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]);
    }
    setActiveFile(filename);
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
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[0] : "README.md");
    }
  };

  const handleNewTerminal = () => {
    setShowTerminal(true);
    setClearTerminal((prev) => !prev); // Toggle to trigger clearing
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <TopMenuBar onNewTerminal={handleNewTerminal} />
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
              isMobile={isMobile}
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
            {showTerminal && (
              <Terminal
                onCommandNavigate={handleFilenameChange}
                onClose={() => setShowTerminal(false)}
                clearTerminal={clearTerminal}
              />
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <FloatButton.Group
          trigger="click"
          type="primary"
          className="float-button-group"
          icon={<TbNavigationFilled />}
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
