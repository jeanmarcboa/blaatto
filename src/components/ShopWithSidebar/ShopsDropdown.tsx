"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "rsuite";

const ShopDropdown = ({ genders, selectedShops, handleShopChange }) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const [list, setList] = useState(genders);

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (value.length === 0) {
      setList(genders);
    }
    if (value.length >= 2) {
      const filteredList = genders.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setList(filteredList);
    }
  };

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark">Boutiques</p>
        <button
          onClick={() => setToggleDropdown(!toggleDropdown)}
          aria-label="button for gender dropdown"
          className={`text-dark ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* <!-- dropdown menu --> */}
      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {/* search input box */}

        <input
          className="w-full border border-gray-2 rounded-lg py-1.5 px-3 text-sm text-gray-4"
          type="text"
          onChange={handleSearch}
          placeholder="Recherche..."
        />

        <CheckboxGroup
          name="checkbox-group"
          color="green"
          value={selectedShops}
          onChange={(value) => {
            handleShopChange(value);
          }}
        >
          {list.map((gender: any, key: number) => (
            <Checkbox value={gender.id} key={key}>
              {gender.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
};

export default ShopDropdown;
