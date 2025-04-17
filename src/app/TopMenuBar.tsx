import React, { useState, useRef, useEffect } from "react";
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
    options: ["New Terminal"],
  },
  {
    label: "Help",
    options: [],
  },
];

interface TopMenuBarProps {
  onNewTerminal: () => void;
}

export const TopMenuBar: React.FC<TopMenuBarProps> = ({ onNewTerminal }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const menuRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isMobile = window.innerWidth <= 768;

  const handleMenuClick = (menu: { label: string; options: string[] }) => {
    console.log(`Menu clicked: ${menu.label}`);
    if (menu.options.length === 0) {
      setIsAlertOpen(true);
      return;
    }

    // Calculate dropdown position for mobile
    if (isMobile) {
      const button = menuRefs.current.get(menu.label);
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    }

    setActiveMenu(activeMenu === menu.label ? null : menu.label);
  };

  const handleOptionClick = (
    option: string,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    console.log(`Option clicked: ${option}`);
    e.stopPropagation();
    e.preventDefault();

    if (option === "Download Resume") {
      downloadFile("/data/resume.pdf", "resume.pdf");
    } else if (option === "New Terminal") {
      onNewTerminal();
    }
    setActiveMenu(null);
  };

  const preventTouchScroll = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (activeMenu) {
      console.log(`Dropdown should be visible for: ${activeMenu}`);
    }
  }, [activeMenu]);

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
            <button
              ref={(el) => {
                if (el) menuRefs.current.set(menu.label, el);
              }}
              onClick={() => handleMenuClick(menu)}
              onTouchStart={preventTouchScroll}
            >
              {menu.label}
            </button>
            {activeMenu === menu.label && (
              <div
                className="dropdown"
                style={
                  isMobile
                    ? {
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                      }
                    : {}
                }
              >
                {menu.options.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={(e) => handleOptionClick(option, e)}
                    onTouchStart={preventTouchScroll}
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
