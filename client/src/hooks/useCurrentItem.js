import {useReducer} from "react";
import postService from "../services/postsService";
import auth from "../services/authService";

const initialState = {
  currentItem: {},
  loading: false,
  error: null,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {...state, loading: true, error: null};
    case "error":
      return {...state, currentItem: {}, loading: false, error: payload};
    case "setCurrentPost":
      return {
        ...state,
        currentItem: payload,
        loading: false,
        error: null,
      };
    case "likePost":
      return {
        ...state,
        currentItem: Object.assign(state.currentItem, payload),
        loading: false,
        error: null,
      };
    case "disLikePost":
      return {
        ...state,
        currentItem: Object.assign(state.currentItem, payload),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
export default function useCurrentItem() {
  const [{currentItem, loading, error}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getCurrentItem = async post_id => {
    dispatch({type: "loading"});
    try {
      const {data} = await postService.getPostById(post_id);

      dispatch({type: "setCurrentPost", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const handleLike = async item => {
    if (auth.getCurrentUser()) {
      if (item.like_user_id.includes(auth.getCurrentUser().id)) {
        try {
          const {data} = await postService.disLikePost(
            auth.getCurrentUser().id,
            item.id,
          );
          dispatch({type: "disLikePost", payload: data});
        } catch (err) {
          dispatch({type: "error", payload: err.response.data || err.message});
        }
      } else {
        try {
          const {data} = await postService.likePost(
            auth.getCurrentUser().id,
            item.id,
          );
          dispatch({type: "likePost", payload: data});
        } catch (err) {
          dispatch({type: "error", payload: err.response.data || err.message});
        }
      }
    } else dispatch({type: "error", payload: "Please sign in"});
  };

  return [currentItem, loading, error, getCurrentItem, handleLike];
}
