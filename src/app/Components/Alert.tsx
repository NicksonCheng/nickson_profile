import * as React from "react";
import "@/styles/components/alert.scss";
import Image from "next/image";

interface AlertProps {
  isOpen: boolean;
  mode?: "warning" | "confirm";
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  mode = "warning",
  title,
  message,
  onConfirm,
  onCancel,
  onClose = () => {},
}) => {
  if (!isOpen) return null;

  const isConfirm = mode === "confirm";

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
              unoptimized
            />
          </div>
          <div className="message-wrapper">
            <h2>
              {title ??
                (isConfirm ? "Are you sure?" : "Oops! Under Development")}
            </h2>
            <p>
              {message ??
                (isConfirm
                  ? "Do you want to proceed with this action?"
                  : "This function is still in development. Our cute capybara engineer is coding hard to get it ready!")}
            </p>

            <div className="button-group">
              {isConfirm ? (
                <>
                  <button
                    className="yes-button"
                    onClick={() => {
                      onConfirm?.();
                      onClose();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="no-button"
                    onClick={() => {
                      onCancel?.();
                      onClose();
                    }}
                  >
                    No
                  </button>
                </>
              ) : (
                <button className="close-button" onClick={onClose}>
                  Got it!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
