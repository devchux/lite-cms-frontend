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
  events: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  event: {},
  loading: false,
  deleted: false,
};

export const eventsReducer = (state = initialState, action) => {
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
        events: {
          ...state.events,
          data: [{ ...action.payload.event }, ...state.events.data],
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
        event: action.payload.event,
        deleted: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        events: {
          ...state.events,
          total: state.events.total - 1,
          data: state.events.data.filter(
            (post) => action.payload.id !== post.id
          ),
        },
        event: action.payload.id === state.event.id ? {} : state.event,
      };
    case DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        events: {
          ...state.events,
          total: state.events.total - action.payload.ids.length,
          data: state.events.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        event: action.payload.ids.includes(state.event.id) ? {} : state.event,
      };
    case UPDATE:
      const data = state.events.data.map((item) => {
        if (item.id === action.payload.event.id)
          return { ...action.payload.event };
        return item;
      });
      return {
        ...state,
        loading: false,
        events: {
          ...state.events,
          data,
        },
        event: action.payload.event,
      };
    default:
      return initialState;
  }
};
