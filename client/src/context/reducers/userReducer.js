import actionTypes from "../actions/actionTypes";

export const initialState = {
  user: {},
  is_authenticated: false,
  loading: false,
  success: false,
  error: null,
};

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.LOADING:
      return {
        ...state,
        is_authenticated: false,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        user: null,
        is_authenticated: false,
        loading: false,
        success: false,
        error: payload,
      };
    case actionTypes.ADD:
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.GET:
      return {
        ...state,
        user: payload,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.GET_ALL:
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        is_authenticated: true,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        is_authenticated: false,
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
