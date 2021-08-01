import actionTypes from "../actions/action_types";

export const initialState = {
  user: {},
  is_authenticated: false,
  loading: false,
  success: false,
  error: {},
};

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.LOADING:
      return {
        ...state,
        user: null,
        is_authenticated: false,
        loading: true,
        error: null,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        user: null,
        is_authenticated: false,
        loading: false,
        error: payload,
      };
    case actionTypes.POST:
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
    case actionTypes.LOGIN:
      return {
        ...state,
        is_authenticated: true,
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
