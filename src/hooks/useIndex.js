import { useEffect, useState } from "react";

export const useIndex = (
  dispatch,
  deleteSingle,
  deleteBulk,
  getAll,
  data,
  deleted,
  isIndex,
  loading
) => {
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const remove = (ids, isBulk) => {
    if (loading) return;
    if (isBulk) {
      return dispatch(deleteBulk(ids));
    } else {
      return dispatch(deleteSingle(ids));
    }
  };

  if (deleted) {
    let newPage = page - 1;
    if (data.length === 0 && page !== 1) newPage = page - 2;
    dispatch(getAll({ page: newPage, size }));
  }

  useEffect(() => {
    if (isIndex) dispatch(getAll({ page: page - 1, size }));
  }, [dispatch, getAll, isIndex, page, size]);

  return {
    remove,
    size,
    page,
    setPage,
  };
};
