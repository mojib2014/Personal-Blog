import http from "./httpService";

const getUserByEmail = async email => {
  try {
    return await http.get(`/users/${email}`);
  } catch (err) {
    throw err;
  }
};

const getUserPosts = async user_id => {
  try {
    return await http.get(`/users/user/posts/${user_id}`);
  } catch (err) {
    throw err;
  }
};

const getUserById = async user_id => {
  try {
    return await http.get(`/users/user/${user_id}`);
  } catch (err) {
    throw err;
  }
};

// const getUserProfileByUsername = async (username) => {
//   try {
//     return await http.get("/users/profile/username", { params: username });
//   } catch (err) {
//     throw err;
//   }
// };

// const getUserPostsByUsername = async (username) => {
//   try {
//     return await http.get("/users/author/posts", { params: username });
//   } catch (err) {
//     throw err;
//   }
// };
const userService = {
  getUserByEmail,
  getUserPosts,
  getUserById,
  // getUserPostsByUsername,
  // getUserProfileByUsername,
};

export default userService;
