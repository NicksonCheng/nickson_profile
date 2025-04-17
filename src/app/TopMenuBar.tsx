import React, { useState } from "react";
import "@/styles/topmenubar.scss";
import Image from "next/image";
import { Alert } from "./Components/Alert";
import { downloadFile } from "@/utils/utils";
const menuItems = [
  {
    label: "File",
    options: ["Download Resume"],
  },
  {
    label: "Edit",
    options: [],
  },
  {
    label: "Selection",
    options: [],
  },
  {
    label: "View",
    options: [],
  },
  {
    label: "Go",
    options: [],
  },
  {
    label: "Run",
    options: [],
  },
  {
    label: "Terminal",
    options: [],
  },
  {
    label: "Help",
    options: [],
  },
];

export const TopMenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const handleMenuClick = (menu: { label: string; options: string[] }) => {
    if (menu.options.length === 0) {
      setIsAlertOpen(true);
      return;
    }
    setActiveMenu(activeMenu === menu.label ? null : menu.label);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);

    if (option === "Download Resume") {
      downloadFile("/data/resume.pdf", "resume.pdf");
    }
    setActiveMenu(null); // Close the dropdown after selection
  };

  return (
    <header>
      <nav>
        <Image
          width={30}
          height={30}
          src="/images/vscode_muscle.png"
          alt="VS Code Icon"
        />
        {menuItems.map((menu) => (
          <div key={menu.label} className="menu-item">
            <button onClick={() => handleMenuClick(menu)}>{menu.label}</button>
            {activeMenu === menu.label && (
              <div className="dropdown">
                {menu.options.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </header>
  );
};
