// import React, { useReducer } from "react";
// import { initialState, postReducer } from "../reducers/postReducer";
// import PostContext from "../../context/postContext";
// import postService from "../../services/postsService";
// import actions from "../actions/actions";
// import auth from "../../services/authService";

// const PostProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(postReducer, initialState);

//   const addPost = async (post) => {
//     try {
//       dispatch(actions.loading());

//       const user = await auth.getCurrentUser();
//       post.author = user.id;

//       const { data } = await postService.createPost(post);

//       dispatch(actions.addPost(data));
//     } catch (err) {
//       dispatch(actions.error(err.response.data || err.message));
//     }
//   };

//   const getPosts = async () => {
//     try {
//       dispatch(actions.loading());

//       const { data: posts } = await postService.getAllPosts();

//       dispatch(actions.getPosts(posts));
//     } catch (err) {
//       dispatch(actions.error(err.response.data || err.message));
//     }
//   };

//   return (
//     <PostContext.Provider
//       value={{
//         posts: state.posts,
//         loading: state.loading,
//         error: state.error,
//         success: state.success,
//         addPost,
//         getPosts,
//       }}
//     >
//       {children}
//     </PostContext.Provider>
//   );
// };

// export default PostProvider;
