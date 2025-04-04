"use client";
import * as React from "react";
import { About } from "./MainContent/About";
import { Experience } from "./MainContent/Experience";
import { Projects } from "./MainContent/Projects";
import { SideNavigation } from "./SideNavigation";
import { TopMenuBar } from "./TopMenuBar";
import { Files } from "./Files";
import { FloatButton } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

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

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

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
          {(!isMobile || (isMobile && showFiles)) && (
            <Files onFilenameChange={handleFilenameChange} />
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
          <FloatButton onClick={() => setShowFiles((prev) => !prev)} />
        </FloatButton.Group>
      )}
    </div>
  );
}
