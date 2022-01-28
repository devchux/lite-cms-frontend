import { useState } from "react";

export const usePagination = ({ data, pageLimit, dataLimit, setPage, page, current }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = page * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((current + 1 - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return {
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    getPaginationGroup,
    pages,
    currentPage: current + 1,
  };
};
