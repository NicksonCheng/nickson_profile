import * as React from "react";
import "../styles/side_navigation.scss";
import { IconButton } from "./IconButton";
import FilesIcon from "../../public/file.svg";
import MagnifierIcon from "../../public/magnifier.svg";
import WebComponentsIcon from "../../public/extension.svg";
import GitForkIcon from "../../public/git.svg";
import AccountIcon from "../../public/profile.svg";
import SettingOutlinedIcon from "../../public/setting.svg";

type NaviProps = {
  className?: string;
};
const navIcons = [
  { component: FilesIcon, name: "file" },
  { component: MagnifierIcon, name: "magnifier" },
  { component: WebComponentsIcon, name: "web-components" },
  { component: GitForkIcon, name: "git-fork" },
  { component: AccountIcon, name: "account" },
  { component: SettingOutlinedIcon, name: "setting-outlined" },
];

export const SideNavigation: React.FC<NaviProps> = ({ className }) => {
  return (
    <nav className={`side-navigation ${className || ""}`}>
      <div className="top-icons">
        {navIcons.slice(0, 4).map((icon, index) => (
          <IconButton alt={icon.name} key={index} icon={icon.component} />
        ))}
      </div>
      <div className="bottom-icons">
        {navIcons.slice(4).map((icon, index) => (
          <IconButton alt={icon.name} key={index + 4} icon={icon.component} />
        ))}
      </div>
    </nav>
  );
};
