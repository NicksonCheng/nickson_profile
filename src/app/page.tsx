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

// floating button icons
import { CustomerServiceOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "../styles/page.scss";

export default function Home() {
  const mainpage = {
    "README.md": <About />,
    "experience.tsx": <Experience />,
    "main.py": <Projects />,
    "thesis.pdf": <Thesis />,
  };

  const [page_name, setPagename] =
    React.useState<keyof typeof mainpage>("README.md");
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
    if (filename in mainpage) {
      setPagename(filename as keyof typeof mainpage);
    }
  };
  const handleIconChange = (icon_name: string) => {
    switch (icon_name) {
      case "file":
        setShowFiles((prev) => !prev);
        break;
      case "account":
        setPagename("README.md" as keyof typeof mainpage);
        break;
      default:
        break;
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
              selectedFile={page_name}
              className={`files ${isMobile && showFiles ? "visible" : ""}`}
            />
          )}
          <div className="content-section">{mainpage[page_name]}</div>
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
              setShowTools((prev) => !prev); // Toggle showTools
              setShowFiles(false); // Close showFiles when tools open
            }}
          />
          <FloatButton
            onClick={() => {
              setShowFiles((prev) => !prev); // Toggle showFiles
              setShowTools(false); // Close showTools when files open
            }}
          />
        </FloatButton.Group>
      )}
    </div>
  );
}
