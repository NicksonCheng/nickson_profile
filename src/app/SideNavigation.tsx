import * as React from "react";
import "../styles/side_navigation.scss";
import { LuFiles } from "react-icons/lu";
import { SlMagnifier } from "react-icons/sl";
import { IoGitBranchOutline } from "react-icons/io5";
import { VscExtensions } from "react-icons/vsc";
import { VscDebugAlt } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
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
  const [activeIcon, setActivateIcon] = React.useState("file");
  return (
    <nav className={`side-navigation ${className || ""}`}>
      <div className="top-icons">
        {navIcons.slice(0, 4).map((icon, index) => (
          <button
            key={index}
            className={`icon-button ${
              activeIcon === icon.name ? "active" : ""
            }`}
            onClick={() => {
              onClickIcon(icon.name);
              setActivateIcon(icon.name);
            }}
          >
            {icon.component}
          </button>
        ))}
      </div>
      <div className="bottom-icons">
        {navIcons.slice(4).map((icon, index) => (
          <button
            key={index}
            className={`icon-button ${
              activeIcon === icon.name ? "active" : ""
            }`}
            onClick={() => {
              onClickIcon(icon.name);
              setActivateIcon(icon.name);
            }}
          >
            {icon.component}
          </button>
        ))}
      </div>
    </nav>
  );
};
