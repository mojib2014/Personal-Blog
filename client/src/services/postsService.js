import http from "./httpService";

const getAllPosts = async () => {
  try {
    return await http.get("/posts");
  } catch (err) {
    throw err;
  }
};

const getPostById = async (post_id) => {
  try {
    return await http.get("/posts/post", { params: post_id });
  } catch (err) {
    throw err;
  }
};

const createPost = async (post) => {
  try {
    return await http.post("/posts/new", post);
  } catch (err) {
    throw err;
  }
};

const updatePostById = async (post) => {
  try {
    return await http.put("/posts/post/update", post);
  } catch (err) {
    throw err;
  }
};

const deletePostComments = async (post_id) => {
  try {
    return await http.delete("/posts/post/comments/delete", {
      params: post_id,
    });
  } catch (err) {
    throw err;
  }
};

const deletePost = async (post_id) => {
  try {
    return await http.delete("/posts/post/delete", { params: post_id });
  } catch (err) {
    throw err;
  }
};

const likePost = async (user_id, post_id) => {
  try {
    return await http.put("/posts/post/like", { user_id, post_id });
  } catch (err) {
    throw err;
  }
};

const disLikePost = async (user_id, post_id) => {
  try {
    return await http.put("/posts/post/dislike", { user_id, post_id });
  } catch (err) {
    throw err;
  }
};

const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostComments,
  deletePost,
  likePost,
  disLikePost,
};

export default postService;