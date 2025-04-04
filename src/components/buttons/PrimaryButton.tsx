import React from "react";
import './PrimaryButton.module.css';
import styles from './PrimaryButton.module.css';
import { useState } from 'react';

interface ButtonProps {
  text: string;
  onClick?: (num? : number) => void;
  type?: "button" | "submit" | "reset";
  isFilter: boolean;
  isActive?: boolean; // Track whether the button is active or not
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, type = "button", isFilter, isActive }) => {
    const [active, setActive] = useState(isActive)
  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
    if (isFilter) {
        let value = active
        setActive(!value)
    }
  };

  return (
    <button 
      onClick={onClickHandler} 
      type={type} 
      className={active ? styles.active : ""}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
