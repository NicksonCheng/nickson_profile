import * as React from "react";
import { Alert } from "./Components/Alert";
import "@/styles/topmenubar.scss";

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
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const handleFeatureClick = () => {
    setIsAlertOpen(true); // Trigger alert
  };
  return (
    <header>
      <nav>
        {menuItems.map((item) => (
          <button onClick={handleFeatureClick} key={item}>
            {item}
          </button>
        ))}
      </nav>
      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </header>
  );
};
