import actionTypes from "../actions/types";

const {
  CONTACT_ERROR,
  CONTACT_LOADING,
  CONTACT_ADD_SINGLE,
  CONTACT_FETCH_BULK,
  CONTACT_FETCH_SINGLE,
  CONTACT_DELETE_SINGLE,
  CONTACT_DELETE_BULK,
  CONTACT_UPDATE,
} = actionTypes;

const initialState = {
  status: "",
  message: "",
  contacts: {
    currentPage: 0,
    data: [],
    total: 0,
    totalPages: 0,
  },
  contact: {
    id: "",
    role: "",
    Contact: {},
  },
  loading: false,
  deleted: false,
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case CONTACT_ADD_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: false,
        contacts: {
          ...state.contacts,
          data: [{ ...action.payload.contact }, ...state.contacts.data],
        },
      };
    case CONTACT_FETCH_BULK:
      return {
        ...state,
        ...action.payload,
        loading: false,
        deleted: false,
      };
    case CONTACT_FETCH_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        contact: action.payload.contact,
        deleted: false,
      };
    case CONTACT_DELETE_SINGLE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        contacts: {
          ...state.contacts,
          total: state.contacts.total - 1,
          data: state.contacts.data.filter(
            (contact) => action.payload.id !== contact.id
          ),
        },
        contact: action.payload.id === state.contact.id ? {
          id: "",
          role: "",
          Contact: {
            email: "",
            name: "",
            phoneNumber: "",
          },
        } : state.contact,
      };
    case CONTACT_DELETE_BULK:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        deleted: true,
        contacts: {
          ...state.contacts,
          total: state.contacts.total - action.payload.ids.length,
          data: state.contacts.data.filter(
            ({ id }) => !action.payload.ids.includes(id)
          ),
        },
        contact: action.payload.ids.includes(state.contact.id)
          ? {
              id: "",
              role: "",
              Contact: {
                email: "",
                name: "",
                phoneNumber: "",
              },
            }
          : state.contact,
      };
    case CONTACT_UPDATE:
      const data = state.contacts.data.map((item) => {
        if (item.id === action.payload.contact.id)
          return { ...action.payload.contact };
        return item;
      });
      return {
        ...state,
        loading: false,
        contacts: {
          ...state.contacts,
          data,
        },
        contact: action.payload.contact
      };
    default:
      return initialState;
  }
};
