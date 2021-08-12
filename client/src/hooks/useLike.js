import {useReducer} from "react";
import postService from "../services/postsService";

const initialState = {
  post: {},
  loading: false,
  error: null,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "getPost":
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };
    case "likeDisLike":
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };
    case "eror":
      return {
        ...state,
        post: {},
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default function useLike() {
  const [{post, loading, error}, dispatch] = useReducer(reducer, initialState);

  const handleLikeDislike = async post => {
    dispatch({type: "loading"});
    try {
      const {data} = await postService.likePost(post.author, post.id);

      dispatch({type: "likeDisLike", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };
  return {post, loading, error, handleLikeDislike};
}
