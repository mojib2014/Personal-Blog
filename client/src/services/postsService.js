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
    return await http.get(`/posts/post/${post_id}`);
  } catch (err) {
    throw err;
  }
};

const getAuthorPosts = async (author_id) => {
  try {
    return await http.get(`/posts/author/posts/${author_id}`);
  } catch (err) {
    throw err;
  }
};

const savePost = async (formData) => {
  try {
    const item = JSON.parse(formData.get("item"));
    if (item.post_id) {
      return http.put("/posts/post/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      return http.post("/posts/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (err) {
    console.log("errorr postservice", err);
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
    return await http.delete(`/posts/post/${post_id}`);
  } catch (err) {
    throw err;
  }
};

const likePost = async (user_id, post_id) => {
  try {
    return await http.put(`/posts/post/like/${user_id}`, { post_id });
  } catch (err) {
    throw err;
  }
};

const disLikePost = async (user_id, post_id) => {
  try {
    return await http.put(`/posts/post/dislike/${user_id}`, { post_id });
  } catch (err) {
    throw err;
  }
};

const postService = {
  savePost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostComments,
  deletePost,
  likePost,
  disLikePost,
  getAuthorPosts,
};

export default postService;
