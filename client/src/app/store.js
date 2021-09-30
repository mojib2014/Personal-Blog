import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import postSlice from "../features/post/postSlice";
import authorSlice from "../features/author/authorSlice";
import commentsSlice from "../features/comments/commentsSlice";
import usersSlice from "../features/users/usersSlice";
import authSlice from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer,
    post: postSlice,
    author: authorSlice,
    comments: commentsSlice,
    users: usersSlice,
  },
});
