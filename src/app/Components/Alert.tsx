import * as React from "react";
import "@/styles/components/alert.scss";
import Image from "next/image";
interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="alert-content">
          <div className="character-wrapper">
            <Image
              width={500}
              height={500}
              src="/images/capybara_engineer.gif"
              alt="Capybara Engineer Coding"
              className="capybara-gif"
            />
          </div>
          <div className="message-wrapper">
            <h2>Oops! Under Construction</h2>
            <p>
              This function is still in development. Our cute capybara engineer
              is coding hard to get it ready!
            </p>
            <button className="close-button" onClick={onClose}>
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
