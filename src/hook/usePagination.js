import { useState } from "react";

const usePagination = (totalItems) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const range = [
    currentPage * itemsPerPage,
    Math.min((currentPage + 1) * itemsPerPage, totalItems),
  ];

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return {
    range,
    currentPage: currentPage + 1,
    nextPage,
    prevPage,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === totalPages - 1,
  };
};

export default usePagination;
