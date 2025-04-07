import * as React from "react";
import "@/styles/side_navigation.scss";
import { LuFiles } from "react-icons/lu";
import { SlMagnifier } from "react-icons/sl";
import { IoGitBranchOutline } from "react-icons/io5";
import { VscExtensions } from "react-icons/vsc";
import { VscDebugAlt } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { Alert } from "./Components/Alert";

type NaviProps = {
  onClickIcon: (icon_name: string) => void;
  className?: string;
};

const navIcons = [
  { component: <LuFiles size={32} />, name: "file" },
  { component: <SlMagnifier size={32} />, name: "magnifier" },
  { component: <VscExtensions size={32} />, name: "extensions" },
  { component: <IoGitBranchOutline size={32} />, name: "git-fork" },
  { component: <VscDebugAlt size={32} />, name: "debug" },
  { component: <VscAccount size={32} />, name: "account" },
  { component: <VscSettingsGear size={32} />, name: "setting-outlined" },
];

export const SideNavigation: React.FC<NaviProps> = ({
  onClickIcon,
  className,
}) => {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = React.useState(false); // State for chatbox visibility
  const [activeIcon, setActivateIcon] = React.useState("file");

  const usefulIcon = ["file", "account", "setting-outlined"];

  const handleFeatureClick = (icon_name: string) => {
    if (!usefulIcon.includes(icon_name)) {
      setIsAlertOpen(true); // Show alert for non-useful icons
    } else if (icon_name === "setting-outlined") {
      setIsChatboxOpen(true); // Show chatbox when "setting-outlined" is clicked
      setActivateIcon(icon_name);
    } else {
      onClickIcon(icon_name);
      setActivateIcon(icon_name);
      setIsChatboxOpen(false); // Close chatbox if another useful icon is clicked
    }
  };

  const handleChatboxOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`); // For now, log the selected option
    setIsChatboxOpen(false); // Close chatbox after selection
  };

  return (
    <div>
      <nav className={`side-navigation ${className || ""}`}>
        <div className="top-icons">
          {navIcons.slice(0, 5).map((icon, index) => (
            <button
              key={index}
              className={`icon-button ${
                activeIcon === icon.name ? "active" : ""
              }`}
              onClick={() => {
                handleFeatureClick(icon.name);
              }}
            >
              {icon.component}
            </button>
          ))}
        </div>
        <div className="bottom-icons">
          {navIcons.slice(5).map((icon, index) => (
            <button
              key={index}
              className={`icon-button ${
                activeIcon === icon.name ? "active" : ""
              }`}
              onClick={() => {
                handleFeatureClick(icon.name);
              }}
            >
              {icon.component}
            </button>
          ))}
        </div>
      </nav>

      {/* Chatbox for settings */}
      {isChatboxOpen && (
        <div className="chatbox">
          <div className="chatbox-content">
            <button
              className="chatbox-option"
              onClick={() => handleChatboxOptionClick("theme")}
            >
              Theme
            </button>
            <button
              className="chatbox-option"
              onClick={() => handleChatboxOptionClick("music")}
            >
              Music
            </button>
          </div>
        </div>
      )}

      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};
