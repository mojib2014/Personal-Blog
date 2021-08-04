import { useReducer } from "react";
import { PostContext } from "../postContext";
import { postReducer, initialState } from "../reducers/postReducer";
import actions from "../actions/actions";
import postService from "../../services/postsService";
import auth from "../../services/authService";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    dispatch(actions.loading());
    try {
      const { data } = await postService.getAllPosts();

      dispatch(actions.getAll(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const addPost = async (post) => {
    dispatch(actions.loading());
    try {
      const user = await auth.getCurrentUser();
      post.author = user.id;

      const { data } = await postService.createPost(post);

      dispatch(actions.add(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const handleLike = async (post) => {
    if (auth.getCurrentUser()) {
      if (post.like_user_id.includes(auth.getCurrentUser().id)) {
        console.log("if statement called");
        try {
          const { data } = await postService.disLikePost(
            auth.getCurrentUser().id,
            post.id,
          );
          dispatch(actions.disLike(data));
        } catch (err) {
          dispatch(actions.error(err.response.data || err.message));
        }
      } else {
        console.log("else statement called");
        try {
          const { data } = await postService.likePost(
            auth.getCurrentUser().id,
            post.id,
          );
          dispatch(actions.like(data));
        } catch (err) {
          dispatch(actions.error(err.response.data || err.message));
        }
      }
    } else dispatch(actions.error("Please sign in"));
  };

  const setSelectedPost = (post) => {
    dispatch(actions.setSelected(post));
  };

  const getAuthorPosts = async (author_id) => {
    dispatch(actions.loading());
    try {
      const { data } = await postService.getAuthorPosts(author_id);
      dispatch(actions.getAuthorPosts(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        authorPosts: state.authorPosts,
        loading: state.loading,
        success: state.success,
        error: state.error,
        getPosts,
        addPost,
        handleLike,
        setSelectedPost,
        getAuthorPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
