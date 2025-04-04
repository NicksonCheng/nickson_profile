import * as React from "react";
import "../styles/topmenubar.scss";

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
    <header>
      <nav>
        {menuItems.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </nav>
    </header>
  );
};
