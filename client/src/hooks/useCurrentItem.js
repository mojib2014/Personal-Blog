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
    case "setCurrentItem":
      return {
        ...state,
        currentItem: payload,
        loading: false,
        error: null,
      };
    case "likeItem":
      return {
        ...state,
        currentItem: Object.assign(state.currentItem, payload),
        loading: false,
        error: null,
      };
    case "disLikeItem":
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

      dispatch({type: "setCurrentItem", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const handleUpvote = async item => {
    try {
      const {data} = await postService.likePost(
        auth.getCurrentUser().id,
        item.id,
      );
      dispatch({type: "likeItem", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const handleDownvote = async item => {
    try {
      const {data} = await postService.disLikePost(
        auth.getCurrentUser().id,
        item.id,
      );
      dispatch({type: "disLikeItem", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  return {
    currentItem,
    loading,
    error,
    getCurrentItem,
    handleUpvote,
    handleDownvote,
  };
}
