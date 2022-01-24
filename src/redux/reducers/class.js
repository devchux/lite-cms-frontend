import actionTypes from "../actions/types";

const {
  CLASS_ERROR,
  CLASS_LOADING,
  CLASS_ADD_SINGLE,
  CLASS_FETCH_BULK,
  CLASS_FETCH_SINGLE,
  CLASS_DELETE_SINGLE,
  CLASS_DELETE_BULK,
  CLASS_UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  classes: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  class: {
    id: "",
    role: "",
    Class: {},
  },
  loading: false,
  deleted: false,
};

export const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case CLASS_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case CLASS_ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        classes: {
          ...state.classes,
          data: [{ ...action.payload.class }, ...state.classes.data],
        },
      };
    case CLASS_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case CLASS_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        class: action.payload.class,
        deleted: false,
      };
    case CLASS_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        classes: {
          ...state.classes,
          total: state.classes.total - 1,
          data: state.classes.data.filter((data) => action.payload.id !== data.id),
        },
        class: action.payload.id === state.class.id ? {
          id: "",
          role: "",
          Class: {
            email: "",
            name: "",
            phoneNumber: "",
          },
        } : state.class,
      };
    case CLASS_DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        classes: {
          ...state.classes,
          total: state.classes.total - action.payload.ids.length,
          data: state.classes.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        class: action.payload.ids.includes(state.class.id)
          ? {
              id: "",
              role: "",
              Class: {
                email: "",
                name: "",
                phoneNumber: "",
              },
            }
          : state.class,
      };
    case CLASS_UPDATE:
      const data = state.classes.data.map((item) => {
        if (item.id === action.payload.class.id)
          return { ...action.payload.class };
        return item;
      });
      return {
        ...state,
        loading: false,
        classes: {
          ...state.classes,
          data,
        },
        class: action.payload.class
      };
    default:
      return initialState;
  }
};
