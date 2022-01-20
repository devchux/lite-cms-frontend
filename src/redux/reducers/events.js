import actionTypes from "../actions/types";

const {
  EVENT_ERROR,
  EVENT_LOADING,
  EVENT_ADD_SINGLE,
  EVENT_FETCH_BULK,
  EVENT_FETCH_SINGLE,
  EVENT_DELETE_SINGLE,
  EVENT_DELETE_BULK,
  EVENT_UPDATE,
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
    case EVENT_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case EVENT_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case EVENT_ADD_SINGLE:
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
    case EVENT_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case EVENT_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        event: action.payload.event,
        deleted: false,
      };
    case EVENT_DELETE_SINGLE:
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
    case EVENT_DELETE_BULK:
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
    case EVENT_UPDATE:
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
