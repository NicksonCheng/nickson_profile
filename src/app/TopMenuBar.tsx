import * as React from "react";
import { Alert } from "./Components/Alert";
import "@/styles/topmenubar.scss";
import Image from "next/image";
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
        <Image
          width={30}
          height={30}
          src="/images/vcode_muscle.png"
          alt="fake vscode icon"
        />
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
