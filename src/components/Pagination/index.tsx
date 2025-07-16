// app/pagination-example/currentPage.tsx ou pages/pagination-example.tsx
"use client"; // si App Router

import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function PaginationPage({
  data,
  currentPage,
  handlePageChange,
}: any) {
  //   const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const renderPagination = () => {
    const visiblePages: (number | "...")[] = [];
    const maxVisible = 4;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - maxVisible && i <= currentPage + maxVisible)
      ) {
        visiblePages.push(i);
      } else if (
        i === currentPage - maxVisible - 1 ||
        i === currentPage + maxVisible + 1
      ) {
        visiblePages.push("...");
      }
    }

    return visiblePages.map((p, index) => (
      <button
        key={index}
        onClick={() => typeof p === "number" && handlePageChange(p)}
        className={`text-sm font-medium leading-none cursor-pointer ${
          currentPage === p
            ? "text-green border-green"
            : "text-gray-5 border-transparent"
        } hover:text-green hover:border-green pt-3 mr-4 px-2`}
        disabled={p === "..."}
      >
        {p}
      </button>
    ));
  };

  return (
    <>
      <div className="flex items-center justify-center py-6 lg:px-4 sm:px-4 px-2">
        <div className="w-full flex items-center justify-between border-t border-gray-4">
          {/* Bouton précédent */}
          {Number(totalPages) > 0 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center pt-3 text-gray-6 hover:text-green cursor-pointer disabled:cursor-not-allowed"
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4L4.49984 7.33333"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4.00002L4.49984 0.666687"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm ml-3 font-medium leading-none">Précédent</p>
            </button>
          )}

          {/* on  compacte */}
          <div className="sm:flex hidden">
            {Number(totalPages) > 0 && renderPagination()}
          </div>

          {/* Bouton suivant */}
          {Number(totalPages) > 0 && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center pt-3 text-gray-6 hover:text-green cursor-pointer disabled:cursor-not-allowed"
            >
              <p className="text-sm font-medium leading-none mr-3">Suivant</p>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
