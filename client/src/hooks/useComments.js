import { useReducer, useCallback } from "react";
import commentsService from "../services/commentsService";

export default function useComments() {
  const [state, setState] = useReducer((_, action) => action, {
    loading: true,
  });

  const getComments = useCallback(async (post_id) => {
    try {
      const { data: comments } = await commentsService.getPostComments(post_id);
      setState({ comments, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  return {
    ...state,
    getComments,
  };
}
