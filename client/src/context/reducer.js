import {
  LOADING,
  ERROR,
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_CURRENTUSER,
} from "./actions";

const reducer = (state, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        is_authenticated: false,
        loading: true,
        error: null,
      };
    case ERROR:
      return {
        ...state,
        is_authenticated: false,
        loading: false,
        error: payload,
      };
    case REGISTER:
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        error: null,
      };
    case GET_CURRENTUSER:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case LOGIN:
      return {
        ...state,
        is_authenticated: true,
        loading: false,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        is_authenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
