import React, { useState, useEffect, useRef } from "react";

const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectRef = useRef(null);

  // Function to close the dropdown when a click occurs outside the component
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <div
      className="custom-select custom-select-2 flex-shrink-0 relative "
      ref={selectRef}
    >
      <div
        className={`select-selected whitespace-nowrap dark:bg-dark-3 dark:text-white ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption.label} asd
      </div>
      <div
        className={`select-items dark:bg-dark-3 ${isOpen ? "" : "select-hide"}`}
      >
        {options.slice(1).map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item dark:text-white dark:hover:text-white dark:hover:bg-gray-4/50 my-1 ${
              selectedOption === option
                ? "same-as-selected dark:bg-gray-4/50"
                : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
