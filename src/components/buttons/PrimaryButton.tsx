import React, { use } from "react";
import './PrimaryButton.module.css'
import { useState } from 'react'

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" ;
  isFilter: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, type = "button" , isFilter}) => {
    const [isActive, setIsActive] = useState(false)
    const onClickHandler = () => {
        if (onClick) {
            onClick()
        }
        
        if (isFilter) {
            let value = isActive ? false : true
            setIsActive(value)
            console.log("llegué")
        }
    }

    return (
        <button onClick={onClickHandler} type={type} className={isActive ? "active" : ""}>
            {text}
        </button>
    );
};

export default PrimaryButton;