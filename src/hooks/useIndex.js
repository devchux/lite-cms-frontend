import { useEffect, useState } from "react";
import { useNavigation } from "./useNavigation";

export const useIndex = (
  dispatch,
  deleteSingle,
  deleteBulk,
  getAll,
  data,
  deleted,
  isIndex,
  loading,
  isSubLiist = false
) => {
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const { paramId } = useNavigation();

  const remove = (ids, isBulk) => {
    if (loading) return;
    let newPage = page - 1;
    if (isBulk) {
      if (data.data.length === ids.length && page !== 1) {
        newPage = page - 2;
      }
      dispatch(deleteBulk(ids, { page: newPage, size, slug: paramId })).then(
        () => setPage(newPage + 1)
      );
      return;
    } else {
      if (data.data.length === 1 && page !== 1) {
        newPage = page - 2;
      }
      dispatch(deleteSingle(ids, { page: newPage, size, slug: paramId })).then(
        () => setPage(newPage + 1)
      );
      return;
    }
  };

  // const removeSubContent = (id) => {
  //   if (loading) return;
  //   let newPage = page - 1;
  //   if (data.data.length === 1 && page !== 1) {
  //     newPage = page - 2;
  //   }
  //   dispatch(deleteSingle(id, { page: newPage, size })).then(() =>
  //     setPage(newPage + 1)
  //   );
  // }

  // if (deleted) {
  //   let newPage = page - 1;
  //   if (data.data.length === 0 && page !== 1) {
  //     newPage = page - 2;
  //   }
  // }

  useEffect(() => {
    if (isIndex) {
      dispatch(getAll({ page: page - 1, size }));
    }
  }, [dispatch, getAll, isIndex, page, size]);

  useEffect(() => {
    if (isSubLiist) {
      dispatch(getAll({ page: page - 1, size }, paramId));
    }
  }, [dispatch, getAll, isSubLiist, page, paramId, size]);

  return {
    remove,
    size,
    page,
    setPage,
  };
};
