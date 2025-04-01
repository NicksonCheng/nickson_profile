import * as React from "react";

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];

export const TopMenuBar: React.FC = () => {
  return (
    <header className="flex items-center px-4 py-3.5 w-full bg-zinc-800 border-[1px_solid_#494949] h-[66px]">
      <nav className="flex gap-5 text-xs text-white">
        {menuItems.map((item) => (
          <button
            key={item}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
};
