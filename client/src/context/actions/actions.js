import actionTypes from "./actionTypes";

const loading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

const error = (err) => {
  return {
    type: actionTypes.ERROR,
    payload: err,
  };
};

const add = (post) => {
  return {
    type: actionTypes.POST,
    payload: post,
  };
};

const update = (post) => {
  return {
    type: actionTypes.UPDATE,
    payload: post,
  };
};

const deleteById = (post) => {
  return {
    type: actionTypes.DELETE,
    payload: post,
  };
};

const getAll = (post) => {
  return {
    type: actionTypes.GET_ALL,
    payload: post,
  };
};

const setSelected = (post) => {
  return {
    type: actionTypes.SET_SELECTED_POST,
    payload: post,
  };
};

const like = (post) => {
  return {
    type: actionTypes.LIKE,
    payload: post,
  };
};

const disLike = (post) => {
  return {
    type: actionTypes.DISLIKE,
    payload: post,
  };
};

const loginUser = () => {
  return {
    type: actionTypes.LOGIN,
  };
};

const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const getById = (user) => {
  return {
    type: actionTypes.GET,
    payload: user,
  };
};

const getAuthorPosts = (posts) => {
  return {
    type: actionTypes.GET_AUTHOR_POSTS,
    payload: posts,
  };
};

const postActions = {
  loading,
  error,
  add,
  update,
  deleteById,
  getAll,
  setSelected,
  like,
  disLike,
  loginUser,
  logoutUser,
  getById,
  getAuthorPosts,
};

export default postActions;
