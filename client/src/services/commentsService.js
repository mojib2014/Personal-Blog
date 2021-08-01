import http from "./httpService";

export const createPostComment = async (
  comment,
  user_id,
  username,
  post_id,
) => {
  try {
    return await http.post("/comments/create", {
      comment,
      user_id,
      username,
      post_id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePostComment = async (
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
  }
};

export const deletePostComment = async (comment_id) => {
  try {
    return await http.delete("/comments/delete", { comment_id });
  } catch (err) {
    console.log(err);
  }
};

export const getPostComments = async (post_id) => {
  try {
    return await http.get("/comments/post-comments", { params: post_id });
  } catch (err) {
    console.log(err);
  }
};
