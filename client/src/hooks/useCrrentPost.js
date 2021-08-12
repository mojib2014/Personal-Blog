import {useReducer} from "react";
import postService from "../services/postsService";

const initialState = {
  currentPost: {},
  loading: false,
  error: null,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {...state, loading: true, error: null};
    case "error":
      return {...state, currentPost: {}, loading: false, error: payload};
    case "setCurrentPost":
      return {
        ...state,
        currentPost: payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
export default function useCrrentPost() {
  const [{currentPost, loading, error}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getCurrentPost = async post_id => {
    dispatch({type: "loading"});
    try {
      const {data} = await postService.getPostById(post_id);

      dispatch({type: "setCurrentPost", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };
  return [currentPost, loading, error, getCurrentPost];
}
