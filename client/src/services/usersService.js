import http from "./httpService";

const getUsers = async () => {
  try {
    return await http.get(`/users`);
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await http.get(`/users/${email}`);
  } catch (err) {
    throw err;
  }
};

const getUserPosts = async (user_id) => {
  try {
    return await http.get(`/users/user/posts/${user_id}`);
  } catch (err) {
    throw err;
  }
};

const getUserById = async (user_id) => {
  try {
    return await http.get(`/users/user/${user_id}`);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (user_id, formData) => {
  try {
    return await http.put(`/users/user/${user_id}`, formData);
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
const usersService = {
  getUserByEmail,
  getUserPosts,
  getUserById,
  updateUser,
  getUsers,
};

export default usersService;
