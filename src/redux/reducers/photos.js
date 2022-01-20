import actionTypes from "../actions/types";

const {
  PHOTO_ERROR,
  PHOTO_LOADING,
  PHOTO_ADD_SINGLE,
  PHOTO_FETCH_BULK,
  PHOTO_DELETE_SINGLE,
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
    case PHOTO_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case PHOTO_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case PHOTO_ADD_SINGLE:
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
    case PHOTO_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case PHOTO_DELETE_SINGLE:
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
