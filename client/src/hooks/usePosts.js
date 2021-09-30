import { useCallback, useEffect, useReducer } from "react";
import postService from "../services/postsService";

export default function usePosts() {
  const [state, setState] = useReducer((_, action) => action, {
    loading: true,
  });

  const getAllPosts = useCallback(async () => {
    try {
      const { data: posts } = await postService.getAllPosts();
      setState({ posts, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return {
    ...state,
    getAllPosts,
  };
}
