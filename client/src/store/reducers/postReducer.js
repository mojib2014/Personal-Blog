import actionTypes from "../actions/action_types";

export const initialState = {
  posts: [],
  loading: false,
  success: false,
  error: null,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.POST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        success: true,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        posts: [],
        loading: false,
        success: false,
        error: action.payload,
      };
    case actionTypes.GET:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
