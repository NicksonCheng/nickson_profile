"use client";
import * as React from "react";
import { About } from "./MainContent/About";
import { Experience } from "./MainContent/Experience";
import { Projects } from "./MainContent/Projects";
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
  };

  const [page_name, setPagename] =
    React.useState<keyof typeof mainpage>("README.md");
  const [showFiles, setShowFiles] = React.useState(false);
  const [showTools, setShowTools] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilenameChange = (filename: string) => {
    console.log(filename);
    if (filename in mainpage) {
      setPagename(filename as keyof typeof mainpage);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <TopMenuBar />

        <div className="page-main">
          {(!isMobile || (isMobile && showTools)) && (
            <SideNavigation
              className={`side-navigation ${
                isMobile && showTools ? "visible" : ""
              }`}
            />
          )}
          {(!isMobile || (isMobile && showFiles)) && (
            <Files
              onFilenameChange={handleFilenameChange}
              className={`files ${isMobile && showFiles ? "visible" : ""}`}
            />
          )}
          {mainpage[page_name]}
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
