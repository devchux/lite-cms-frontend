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
  volunteers: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  volunteer: {},
  loading: false,
  deleted: false,
};

export const volunteersReducer = (state = initialState, action) => {
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
        volunteers: {
          ...state.volunteers,
          data: [{ ...action.payload.volunteer }, ...state.volunteers.data],
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
        volunteer: action.payload.volunteer,
        deleted: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        volunteers: {
          ...state.volunteers,
          total: state.volunteers.total - 1,
          data: state.volunteers.data.filter(
            (post) => action.payload.id !== post.id
          ),
        },
        volunteer: action.payload.id === state.volunteer.id ? {} : state.volunteer,
      };
    case DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        volunteers: {
          ...state.volunteers,
          total: state.volunteers.total - action.payload.ids.length,
          data: state.volunteers.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        volunteer: action.payload.ids.includes(state.volunteer.id) ? {} : state.volunteer,
      };
    case UPDATE:
      const data = state.volunteers.data.map((item) => {
        if (item.id === action.payload.volunteer.id)
          return { ...action.payload.volunteer };
        return item;
      });
      return {
        ...state,
        loading: false,
        volunteers: {
          ...state.volunteers,
          data,
        },
        volunteer: action.payload.volunteer,
      };
    default:
      return initialState;
  }
};
