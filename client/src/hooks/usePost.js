import { useCallback, useReducer } from "react";
import postsService from "../services/postsService";

export default function usePost() {
  const [state, setState] = useReducer((_, action) => action);

  const getPost = useCallback(async (post_id) => {
    try {
      const { data: post } = await postsService.getPostById(post_id);
      setState({ post, loading: false });
    } catch (error) {
      setState({ error: error.response.data || error.message, loading: false });
    }
  }, []);

  const savePost = useCallback(async (post) => {
    try {
      const { data } = await postsService.savePost(post);
      setState({ data, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  const deletePost = useCallback(async (post_id) => {
    try {
      const { data } = await postsService.deletePost(post_id);
      if (data) setState({ post: {}, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  const likePost = useCallback(async (user_id, post_id) => {
    try {
      const { data: post } = await postsService.likePost(user_id, post_id);
      setState({ post, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  const disLikePost = useCallback(async (user_id, post_id) => {
    try {
      const { data: post } = await postsService.disLikePost(user_id, post_id);
      setState({ post, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  return {
    ...state,
    getPost,
    savePost,
    deletePost,
    likePost,
    disLikePost,
  };
}
