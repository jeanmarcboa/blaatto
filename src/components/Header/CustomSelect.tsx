import React, { useState, useEffect } from "react";
import {
  useParams,
  useRouter,
  useSearchParams,
  redirect,
} from "next/navigation";

const CustomSelect = ({ options }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
    if (option.id !== "0") {
      setTimeout(() => {
        router.push("/shop?cat=" + option.id);
      }, 600);
    }
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-content")) {
        toggleDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(options[0]);
  }, [options]);

  return (
    <div
      className="dropdown-content custom-select relative"
      style={{ width: "200px" }}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption?.label}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {/* //Don't show the selected option */}
        {options.map((option: any, index: number) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption === option ? "hidden" : ""
            }`}
          >
            {option?.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
