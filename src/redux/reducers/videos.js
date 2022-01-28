import actionTypes from "../actions/types";

const {
  VIDEO_ERROR,
  VIDEO_LOADING,
  VIDEO_ADD_SINGLE,
  VIDEO_FETCH_BULK,
  VIDEO_DELETE_SINGLE,
  VIDEO_DELETE_SUBJECT,
  VIDEO_UPDATE_SUBJECT,
  VIDEO_FETCH_BULK_SUBJECT,
  VIDEO_FETCH_SINGLE_SUBJECT,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  subjects: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  videos: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  subject: {},
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
        subjects: {
          ...state.subjects,
          data: [{ ...action.payload.subject }, ...state.subjects.data],
        },
      };
    case VIDEO_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };

    case VIDEO_FETCH_BULK_SUBJECT:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case VIDEO_FETCH_SINGLE_SUBJECT:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        subject: action.payload.subject,
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
      };
    case VIDEO_DELETE_SUBJECT:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        subjects: {
          ...state.subjects,
          total: state.subjects.total - 1,
          data: state.subjects.data.filter(
            (subject) => action.payload.id !== subject.id
          ),
        },
      };
    case VIDEO_UPDATE_SUBJECT:
      const data = state.subjects.data.map((item) => {
        if (item.id === action.payload.subject.id)
          return { ...action.payload.subject };
        return item;
      });
      return {
        ...state,
        loading: false,
        subjects: {
          ...state.subjects,
          data,
        },
      };
    default:
      return initialState;
  }
};
