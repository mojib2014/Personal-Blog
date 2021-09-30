import { useCallback, useReducer } from "react";
import postService from "../services/postsService";

export default function useCreatePost() {
  const [state, setState] = useReducer((_, action) => action, {
    isIdle: true,
  });

  const createPost = useCallback(async (values) => {
    setState({ isLoading: true });
    try {
      const data = await postService.savePost(values);
      setState({ isSuccess: true, data });
    } catch (error) {
      console.log("useCreatePost error: ", error);
      setState({ isError: true, error });
    }
  }, []);

  return [state, createPost];
}
