import React from "react";
import "../popup.css";

interface PopupProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content w-full">
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
