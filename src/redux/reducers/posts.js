import actionTypes from "../actions/types";

const {
  ERROR,
  LOADING,
  ADD_SINGLE,
  FETCH_BULK,
  FETCH_SINGLE,
  DELETE_SINGLE,
  DELETE_BULK,
  UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  posts: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  post: {},
  loading: false,
  deleted: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        posts: {
          ...state.articles,
          data: [{ ...action.payload.article }, ...state.articles.data],
        },
      };
    case FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        post: action.payload.article,
        deleted: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        posts: {
          ...state.articles,
          total: state.articles.total - 1,
          data: state.articles.data.filter(
            (post) => action.payload.id !== post.id
          ),
        },
        post: action.payload.id === state.article.id ? {} : state.article,
      };
    case DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        posts: {
          ...state.articles,
          total: state.articles.total - action.payload.ids.length,
          data: state.articles.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        post: action.payload.ids.includes(state.article.id) ? {} : state.article,
      };
    case UPDATE:
      const data = state.articles.data.map((item) => {
        if (item.id === action.payload.article.id)
          return { ...action.payload.article };
        return item;
      });
      return {
        ...state,
        loading: false,
        posts: {
          ...state.articles,
          data,
        },
        post: action.payload.article,
      };
    default:
      return initialState;
  }
};
