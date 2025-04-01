import * as React from "react";
import { IconButton } from "./IconButton";
import FilesIcon from "../../public/file.svg";
import MagnifierIcon from "../../public/magnifier.svg";
import WebComponentsIcon from "../../public/extension.svg";
import GitForkIcon from "../../public/git.svg";
import DebugAltIcon from "../../public/debug.svg";
import AccountIcon from "../../public/profile.svg";
import SettingOutlinedIcon from "../../public/setting.svg";

const navIcons = [
  { component: FilesIcon, name: "file" },
  { component: MagnifierIcon, name: "magnifier" },
  { component: WebComponentsIcon, name: "web-components" },
  { component: GitForkIcon, name: "git-fork" },
  { component: DebugAltIcon, name: "debug-alt" },
  { component: AccountIcon, name: "account" },
  { component: SettingOutlinedIcon, name: "setting-outlined" },
];

export const SideNavigation: React.FC = () => {
  return (
    <nav className="flex flex-col gap-9 items-center py-5 bg-zinc-800 border-[1px_solid_#494949] w-[82px]">
      {navIcons.map((icon, index) => (
        <IconButton alt={icon.name} key={index} icon={icon.component} />
      ))}
    </nav>
  );
};