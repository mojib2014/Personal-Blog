import http from "./httpService";

const createPostComment = async (comment, user_id, username, post_id) => {
  try {
    return await http.post("/comments/create", {
      comment,
      user_id,
      username,
      post_id,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updatePostComment = async (
  comment,
  user_id,
  post_id,
  username,
  comment_id,
) => {
  try {
    return await http.put("/comments/update", {
      comment,
      user_id,
      post_id,
      username,
      comment_id,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deletePostComment = async (comment_id) => {
  try {
    return await http.delete("/comments/delete", { comment_id });
  } catch (err) {
    console.log(err);
  }
};

const getPostComments = async (post_id) => {
  try {
    return await http.get(`/comments/post/comments/${post_id}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const commentsService = {
  createPostComment,
  updatePostComment,
  deletePostComment,
  getPostComments,
};

export default commentsService;
