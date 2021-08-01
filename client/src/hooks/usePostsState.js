import { useEffect, useReducer } from "react";
import { postReducer, initialState } from "../reducers/postReducer";
import postService from "../services/postsService";
import actions from "../store/actions/actions";
import auth from "../services/authService";

export default function usePostsState() {
  const [state, dispatch] = useReducer(postReducer, initialState);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      dispatch(actions.loading());

      const { data } = await postService.getAllPosts();

      dispatch(actions.getData(data));
    } catch (err) {
      dispatch(actions.error(err.response || err.message));
    }
  };

  const addPost = async (post) => {
    try {
      dispatch(actions.loading());

      const user = await auth.getCurrentUser();
      post.author = user.id;

      const { data } = await postService.createPost(post);

      dispatch(actions.addData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const handleLike = async (user_id, post_id) => {
    try {
      dispatch(actions.loading());

      const { data } = await postService.likePost(user_id, post_id);

      dispatch(actions.updateData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const handleDisLike = async (user_id, post_id) => {
    try {
      dispatch(actions.loading());

      const { data } = await postService.disLikePost(user_id, post_id);

      dispatch(actions.updateData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  return [state, addPost, handleLike, handleDisLike];
}
