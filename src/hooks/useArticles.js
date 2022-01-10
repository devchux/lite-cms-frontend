import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import slug from "slug";
import { useEffect, useState } from "react";
import { useNavigation } from "./useNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  deletePosts,
  getAllPosts,
  getSinglePost,
  registerPost,
  updatePost,
} from "../redux/actions/posts";
import { useIndex } from "./useIndex";

export const useArticles = (isEdit, isIndex) => {
  let initialInputs = {
    title: "",
    body: {},
    imageUrl:
      "https://res.cloudinary.com/dcrshimso/image/upload/v1639000203/sample.jpg",
    slug: "",
    published: true,
  };
  const columns = [
    {
      Header: "S/N",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Author",
      accessor: "author",
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
  let editorState = EditorState.createEmpty();
  const { paramId } = useNavigation();
  const { posts, deleted, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  if (isEdit) {
    const { contentBlocks, entityMap } = htmlToDraft("<p> I am home</p>");
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    editorState = EditorState.createWithContent(contentState);
  }
  const [text, setText] = useState(editorState);
  const [inputs, setInputs] = useState({
    ...initialInputs,
    body: editorState,
  });

  const handleEditorChange = (e) => {
    setText(e);
  };

  const setCredentials = (input, value) => {
    let newInputs = { ...inputs, [input]: value };
    if (input === "title") {
      if (slug(inputs.title) === inputs.slug) {
        const slugifyTitle = slug(value);
        newInputs = { ...newInputs, slug: slugifyTitle };
      }
    }
    if (input === "slug") {
      const slugifyTitle = slug(value);
      newInputs = { ...newInputs, slug: slugifyTitle };
    }
    setInputs({ ...inputs, ...newInputs });
  };
  const { remove, page, setPage, modalBody } = useIndex(
    dispatch,
    deletePost,
    deletePosts,
    getAllPosts,
    posts,
    deleted,
    isIndex
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(getSinglePost(paramId)).then((data) => setInputs(data));
    }
  }, [dispatch, isEdit, paramId]);

  const createPost = (publish) => {
    const textToHtml = draftToHtml(convertToRaw(text.getCurrentContent()));
    const validInputs = {
      ...inputs,
      body: textToHtml,
      published: publish,
    };

    if (isEdit) {
      dispatch(updatePost(paramId, validInputs));
      return;
    }
    dispatch(registerPost(validInputs));
  };

  return {
    text,
    inputs,
    handleEditorChange,
    setCredentials,
    columns,
    posts,
    setPage,
    modalBody,
    removeUser: remove,
    page,
    loading,
    createPost,
  };
};
