import React, { useState } from "react";
import styles from "./DropdownMenu.module.css"; // Import as an object

interface DropdownProps {
  label?: string;
  options: string[];
  onSelect: (selected: string) => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelected(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}

      <select className={styles.dropdownSelect} value={selected || ""} onChange={handleSelect}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
