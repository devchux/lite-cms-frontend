import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";

export const useSubList = (
  type,
  deleteSingle,
  deleteBulk,
  getAll,
  isIndex,
) => {
  const data = useSelector((state) => state[type]);
  const dispatch = useDispatch();
  const { openModal, toggle} = useModal()
  const [showMore, toggleShowMore] = useState(false)
  const { remove, size, page, setPage } = useIndex(
    dispatch,
    deleteSingle,
    deleteBulk,
    getAll,
    data[type],
    data.deleted,
    isIndex,
    data.loading,
    true,
  );
  return {
    data: data[type],
    remove,
    size,
    page,
    setPage,
    loading: data.loading,
    openModal,
    toggle,
    showMore,
    toggleShowMore,
  };
};
