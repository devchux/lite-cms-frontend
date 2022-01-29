import actionTypes from "../actions/types";

const {
  AUDIO_ERROR,
  AUDIO_LOADING,
  AUDIO_FETCH_BULK,
  AUDIO_DELETE_SINGLE,
  AUDIO_DELETE_SUBJECT,
  AUDIO_UPDATE_SUBJECT,
  AUDIO_FETCH_BULK_SUBJECT,
  AUDIO_FETCH_SINGLE_SUBJECT,
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
  audios: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  subject: {},
  loading: false,
  deleted: false,
};

export const audiosReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case AUDIO_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case AUDIO_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };

    case AUDIO_FETCH_BULK_SUBJECT:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case AUDIO_FETCH_SINGLE_SUBJECT:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        subject: action.payload.subject,
        deleted: false,
      };
    case AUDIO_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        audios: {
          ...state.audios,
          total: state.audios.total - 1,
          data: state.audios.data.filter(
            (audio) => action.payload.id !== audio.id
          ),
        },
      };
    case AUDIO_DELETE_SUBJECT:
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
    case AUDIO_UPDATE_SUBJECT:
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
