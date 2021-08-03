import actionTypes from "../actions/actionTypes";

export const initialState = {
  posts: [],
  selectedPost: {},
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
        success: false,
        error: false,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        posts: [],
        error: action.payload,
        loading: false,
        success: false,
      };
    case actionTypes.GET_ALL:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.ADD:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.SET_SELECTED:
      return {
        ...state,
        selectedPost: action.payload,
        loading: false,
        success: true,
        error: false,
      };
    case actionTypes.LIKE:
      return {
        ...state,
        selectedPost: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.DISLIKE:
      return {
        ...state,
        selectedPost: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
