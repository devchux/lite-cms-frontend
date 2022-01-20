import actionTypes from "../actions/types";

const {
  POST_ERROR,
  POST_LOADING,
  POST_ADD_SINGLE,
  POST_FETCH_BULK,
  POST_FETCH_SINGLE,
  POST_DELETE_SINGLE,
  POST_DELETE_BULK,
  POST_UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  articles: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  article: {},
  loading: false,
  deleted: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case POST_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case POST_ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        articles: {
          ...state.articles,
          data: [{ ...action.payload.article }, ...state.articles.data],
        },
      };
    case POST_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case POST_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        article: action.payload.article,
        deleted: false,
      };
    case POST_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        articles: {
          ...state.articles,
          total: state.articles.total - 1,
          data: state.articles.data.filter(
            (post) => action.payload.id !== post.id
          ),
        },
        article: action.payload.id === state.article.id ? {} : state.article,
      };
    case POST_DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        articles: {
          ...state.articles,
          total: state.articles.total - action.payload.ids.length,
          data: state.articles.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        article: action.payload.ids.includes(state.article.id) ? {} : state.article,
      };
    case POST_UPDATE:
      const data = state.articles.data.map((item) => {
        if (item.id === action.payload.article.id)
          return { ...action.payload.article };
        return item;
      });
      return {
        ...state,
        loading: false,
        articles: {
          ...state.articles,
          data,
        },
        article: action.payload.article,
      };
    default:
      return initialState;
  }
};