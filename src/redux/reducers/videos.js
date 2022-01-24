import actionTypes from "../actions/types";

const {
  VIDEO_ERROR,
  VIDEO_LOADING,
  VIDEO_ADD_SINGLE,
  VIDEO_FETCH_BULK,
  VIDEO_FETCH_SINGLE,
  VIDEO_DELETE_SINGLE,
  VIDEO_DELETE_BULK,
  VIDEO_UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  videos: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  video: {
    id: "",
    role: "",
    Video: {},
  },
  loading: false,
  deleted: false,
};

export const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case VIDEO_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case VIDEO_ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        videos: {
          ...state.videos,
          data: [{ ...action.payload.video }, ...state.videos.data],
        },
      };
    case VIDEO_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case VIDEO_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        video: action.payload.video,
        deleted: false,
      };
    case VIDEO_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        videos: {
          ...state.videos,
          total: state.videos.total - 1,
          data: state.videos.data.filter(
            (video) => action.payload.id !== video.id
          ),
        },
        video: action.payload.id === state.video.id ? {
          id: "",
          role: "",
          Video: {
            email: "",
            name: "",
            phoneNumber: "",
          },
        } : state.video,
      };
    case VIDEO_DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        videos: {
          ...state.videos,
          total: state.videos.total - action.payload.ids.length,
          data: state.videos.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        video: action.payload.ids.includes(state.video.id)
          ? {
              id: "",
              role: "",
              Video: {
                email: "",
                name: "",
                phoneNumber: "",
              },
            }
          : state.video,
      };
    case VIDEO_UPDATE:
      const data = state.videos.data.map((item) => {
        if (item.id === action.payload.video.id)
          return { ...action.payload.video };
        return item;
      });
      return {
        ...state,
        loading: false,
        videos: {
          ...state.videos,
          data,
        },
        video: action.payload.video
      };
    default:
      return initialState;
  }
};
