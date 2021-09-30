import { useReducer, useCallback } from "react";
import postService from "../services/postsService";

export default function useAuthorPosts() {
  const [state, setState] = useReducer((_, action) => action, {
    loading: true,
  });

  const getAuthorPosts = useCallback(async (author_id) => {
    try {
      const { data: authorPosts } = await postService.getAuthorPosts(author_id);
      setState({ authorPosts, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  return {
    ...state,
    getAuthorPosts,
  };
}
