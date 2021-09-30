import { useReducer, useCallback } from "react";
import tagService from "../services/tagService";

export default function useTags() {
  const [state, setState] = useReducer((_, action) => action, { isIdle: true });

  const getAllTags = useCallback(async () => {
    setState({ loading: true });
    try {
      const { data } = await tagService.getAllTags();
      setState({ loading: false, tags: data });
    } catch (err) {
      setState({ error: err.response.data || err.message });
    }
  }, []);

  const getTag = useCallback(async (tag_id) => {
    setState({ loading: true });
    try {
      const { data } = await tagService.getTag(tag_id);
      setState({ loading: false, tag: data });
    } catch (err) {
      setState({ error: err.reponse.data || err.message });
    }
  }, []);

  return {
    ...state,
    getAllTags,
    getTag,
  };
}
