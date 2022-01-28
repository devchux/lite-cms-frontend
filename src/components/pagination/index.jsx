import { usePagination } from "../../hooks/usePagination";
import "./scss/pagination.scss"

const Pagination = ({ data, dataLimit, pageLimit, setPage, page, current }) => {
  const {
    goToNextPage,
    goToPreviousPage,
    currentPage,
    changePage,
    getPaginationGroup,
  } = usePagination({ data, dataLimit, pageLimit, setPage, page, current });

  return (
    <div className="pagination">
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
      >
        prev
      </button>
      
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem ${currentPage === item ? "active" : null}`}
        >
          <span>{item}</span>
        </button>
      ))}
      
      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pageLimit ? "disabled" : ""}`}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;