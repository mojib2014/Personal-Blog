import {useReducer} from "react";
import auth from "../services/authService";
import postService from "../services/postsService";

export default function usePostsState() {
  const [
    {posts, authorPosts, selectedPost, loading, error, success},
    dispatch,
  ] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    dispatch({type: "loading"});

    try {
      const {data} = await postService.getAllPosts();

      dispatch({type: "getAllPosts", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const addPost = async post => {
    dispatch({type: "loading"});
    try {
      const user = await auth.getCurrentUser();
      post.author = user.id;

      const {data} = await postService.createPost(post);

      dispatch({type: "addPost", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const handleLike = async post => {
    if (auth.getCurrentUser()) {
      if (post.like_user_id.includes(auth.getCurrentUser().id)) {
        try {
          const {data} = await postService.disLikePost(
            auth.getCurrentUser().id,
            post.id,
          );
          dispatch({type: "disLikePost", payload: data});
        } catch (err) {
          dispatch({type: "error", payload: err.response.data || err.message});
        }
      } else {
        try {
          const {data} = await postService.likePost(
            auth.getCurrentUser().id,
            post.id,
          );
          dispatch({type: "likePost", payload: data});
        } catch (err) {
          dispatch({type: "error", payload: err.response.data || err.message});
        }
      }
    } else dispatch({type: "error", payload: "Please sign in"});
  };

  const setCurrentPost = async id => {
    dispatch({type: "loading"});
    try {
      const {data} = await postService.getPostById(id);

      dispatch({type: "setSelectedPost", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  // const getAuthorPosts = async author_id => {
  //   dispatch({type: "loading"});
  //   try {
  //     const {data} = await postService.getAuthorPosts(author_id);
  //     dispatch(actions.getAuthorPosts(data));
  //   } catch (err) {
  //     dispatch({type: "error", payload: err.response.data || err.message});
  //   }
  // };
  return {
    posts,
    authorPosts,
    selectedPost,
    loading,
    error,
    success,
    getPosts,
    addPost,
    // getAuthorPosts,
    handleLike,
    setCurrentPost,
  };
}

export const initialState = {
  posts: [],
  currentPost: {},
  loading: false,
  error: null,
};

export const postReducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "error":
      return {
        ...state,
        posts: [],
        currentPost: {},
        error: payload,
        loading: false,
      };
    case "getAllPosts":
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };
    case "addPost":
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
        error: null,
      };
    case "setSelectedPost":
      return {
        ...state,
        currentPost: payload,
        loading: false,
        error: null,
      };
    case "likePost":
      return {
        ...state,
        posts: Object.assign(
          state.posts,
          state.posts.map(el => (el.id === payload.id ? payload : el)),
        ),
        loading: false,
        error: null,
      };
    case "disLikePost":
      return {
        ...state,
        posts: Object.assign(
          state.posts,
          state.posts.map(el => (el.id === payload.id ? payload : el)),
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
