import actionTypes from "../actions/actionTypes";

export const initialState = {
  posts: [],
  authorPosts: [],
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
        posts: [Object.assign(state.posts, action.payload)],
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.GET_AUTHOR_POSTS:
      return {
        ...state,
        authorPosts: action.payload,
        loading: false,
        success: true,
        error: false,
      };
    case actionTypes.LIKE:
      return {
        ...state,
        posts: [Object.assign(state.posts, action.payload)],
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.DISLIKE:
      return {
        ...state,
        posts: [Object.assign(state.posts, action.payload)],
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};
