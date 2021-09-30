import { useReducer, useCallback } from "react";
import postService from "../services/postsService";

export default function useCurrentPost() {
  const [state, setState] = useReducer((_, action) => action, { isIdle: true });

  const setCurrentPost = useCallback(async (post_id) => {
    setState({ isLoadding: true });
    try {
      const { data: post } = await postService.getPostById(post_id);

      setState({ isSuccess: true, post });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, []);

  return {
    ...state,
    setCurrentPost,
  };
}
