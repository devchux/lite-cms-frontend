import actionTypes from "../actions/types";

const {
  USER_ERROR,
  USER_LOADING,
  USER_ADD_SINGLE,
  USER_FETCH_BULK,
  USER_FETCH_SINGLE,
  USER_DELETE_SINGLE,
  USER_DELETE_BULK,
  USER_UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  users: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  user: {
    id: "",
    role: "",
    User: {
      email: "",
      name: "",
      phoneNumber: "",
    },
  },
  loading: false,
  deleted: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case USER_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case USER_ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        users: {
          ...state.users,
          data: [{ ...action.payload.user }, ...state.users.data],
        },
      };
    case USER_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case USER_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        user: action.payload.user,
        deleted: false,
      };
    case USER_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        users: {
          ...state.users,
          total: state.users.total - 1,
          data: state.users.data.filter(
            (user) => action.payload.id !== user.id
          ),
        },
        user: action.payload.id === state.user.id ? {
          id: "",
          role: "",
          User: {
            email: "",
            name: "",
            phoneNumber: "",
          },
        } : state.user,
      };
    case USER_DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        users: {
          ...state.users,
          total: state.users.total - action.payload.ids.length,
          data: state.users.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        user: action.payload.ids.includes(state.user.id)
          ? {
              id: "",
              role: "",
              User: {
                email: "",
                name: "",
                phoneNumber: "",
              },
            }
          : state.user,
      };
    case USER_UPDATE:
      const data = state.users.data.map((item) => {
        if (item.id === action.payload.user.id)
          return { ...action.payload.user };
        return item;
      });
      return {
        ...state,
        loading: false,
        users: {
          ...state.users,
          data,
        },
        user: action.payload.user
      };
    default:
      return initialState;
  }
};
