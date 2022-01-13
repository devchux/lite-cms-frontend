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
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Status",
      accessor: "published",
    },
    {
      Header: "Author",
      accessor: "Member.User.name",
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
  
  const { paramId } = useNavigation();
  const { articles, deleted, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
    
  const [inputs, setInputs] = useState({
    ...initialInputs,
    body: EditorState.createEmpty(),
  });

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
    articles,
    deleted,
    isIndex
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(getSinglePost(paramId)).then((data) => {
        if (data) {
          const { contentBlocks, entityMap } = htmlToDraft(data.body);
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorState = EditorState.createWithContent(contentState);
          setInputs({ ...data, body: editorState })
        }
      })
    }
  }, [dispatch, isEdit, paramId]);

  const createPost = (publish) => {
    const textToHtml = draftToHtml(convertToRaw(inputs.body.getCurrentContent()));
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
    inputs,
    setCredentials,
    columns,
    articles,
    setPage,
    modalBody,
    removeUser: remove,
    page,
    loading,
    createPost,
  };
};
