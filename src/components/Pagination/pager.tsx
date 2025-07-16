import React, { useState } from "react";

const ITEMS_PER_PAGE = 5;
const ListPager: React.FC<{
  page: number;
  totalPages: number;
  filterParams: string;
  setLoading: (loading: boolean) => void;
  data: (data: any) => void;
  request: (params: string | any) => Promise<any>;
}> = ({ page, filterParams, request, data, setLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  //  charger une nouvelle page
  const onPageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    try {
      setLoading(true);
      const fullFilterParams = `${filterParams}page=${newPage}`;
      const result = await request(fullFilterParams);

      if (result) {
        data(result);
      } else {
        console.error("Aucune donnée renvoyée par la requête");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  //  paginat.. compacte
  const renderPagination = () => {
    const visiblePages: (number | "...")[] = [];
    const maxVisible = 4;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - maxVisible && i <= page + maxVisible)
      ) {
        visiblePages.push(i);
      } else if (i === page - maxVisible - 1 || i === page + maxVisible + 1) {
        visiblePages.push("...");
      }
    }

    return visiblePages.map((p, index) => (
      <button
        key={index}
        onClick={() => typeof p === "number" && onPageChange(p)}
        className={`text-sm font-medium leading-none cursor-pointer ${
          page === p
            ? "text-primary border-primary"
            : "text-gray-600 border-transparent"
        } hover:text-primary hover:border-primary pt-3 mr-4 px-2`}
        disabled={p === "..."}
      >
        {p}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center py-6 lg:px-0 sm:px-4 px-2">
      <div className="lg:w-full w-full flex items-center justify-between border-t border-gray-200">
        {/* Bouton précédent */}
        {Number(totalPages) > 0 && (
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex items-center pt-3 text-gray-600 hover:text-primary cursor-pointer disabled:cursor-not-allowed"
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
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="flex items-center pt-3 text-gray-600 hover:text-primary cursor-pointer disabled:cursor-not-allowed"
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
  );
};

export default ListPager;
