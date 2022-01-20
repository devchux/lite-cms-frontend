import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBook,
  deleteBooks,
  getAllBooks,
  getSingleBook,
  registerBook,
  updateBook,
} from "../redux/actions/books";
import { useForm } from "./useForm";
import { useIndex } from "./useIndex";
import { useModal } from "./useModal";
import { useNavigation } from "./useNavigation";
import { useNotification } from "./useNotification";

export const useBooks = (isEdit, isIndex) => {
  const initialState = {
    title: "",
    imageUrl: "",
    author: "",
    price: 0.0,
    description: "",
  };
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Author",
      accessor: "author",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Date Created",
      accessor: "createdAt",
    },
    {
      Header: "Date Updated",
      accessor: "updatedAt",
    },
  ];
  const dispatch = useDispatch();
  const { books, deleted, loading } = useSelector((state) => state.books);
  const { notify } = useNotification();
  const { toggle, openModal } = useModal();
  const { paramId } = useNavigation();
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deleteBook,
    deleteBooks,
    getAllBooks,
    books,
    deleted,
    isIndex,
    loading
  );

  const { inputs, setCredentials, isInvalid, setInputs } = useForm(
    initialState,
    Object.keys(initialState)
  );

  const submit = () => {
    if (loading) return
    if (isInvalid) return notify("error", "Enter all fields");
    if (isEdit) {
      dispatch(updateBook(paramId, inputs));
      return;
    }
    dispatch(registerBook(inputs));
  };

  const selectPhoto = (url) => {
    setCredentials("imageUrl", url);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleBook(paramId)).then((data) => setInputs(data));
    }
  }, [dispatch, isEdit, paramId, setInputs]);

  return {
    books,
    columns,
    modalBody,
    removeBook: remove,
    setPage,
    page,
    loading,
    inputs,
    setCredentials,
    submit,
    selectPhoto,
    toggle,
    openModal,
  };
};
