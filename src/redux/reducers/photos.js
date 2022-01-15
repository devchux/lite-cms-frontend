import actionTypes from "../actions/types";

const {
  ERROR,
  LOADING,
  ADD_SINGLE,
  FETCH_BULK,
  DELETE_SINGLE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  photos: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  loading: false,
  deleted: false,
};

export const photosReducer = (state = initialState, action) => {
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
        photos: {
          ...state.photos,
          data: [{ ...action.payload.photo }, ...state.photos.data],
        },
      };
    case FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        photos: {
          ...state.photos,
          total: state.photos.total - 1,
          data: state.photos.data.filter(
            (photo) => action.payload.id !== photo.id
          ),
        },
      };
    default:
      return initialState;
  }
};
