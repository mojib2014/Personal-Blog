import actionTypes from "./action_types";

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

const addData = (data) => {
  return {
    type: actionTypes.POST,
    payload: data,
  };
};

const updateData = (data) => {
  return {
    type: actionTypes.UPDATE,
    payload: data,
  };
};

const deleteData = (data) => {
  return {
    type: actionTypes.DELETE,
    payload: data,
  };
};

const getData = (data) => {
  return {
    type: actionTypes.GET,
    payload: data,
  };
};

const loginUser = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: user,
  };
};

const logoutUser = (user) => {
  return {
    type: actionTypes.LOGOUT,
    payload: user,
  };
};

// const addPost = (item) => {
//   return {
//     type: actionTypes.POST,
//     payload: item,
//   };
// };

// const getPosts = (item) => {
//   return {
//     type: actionTypes.GET,
//     payload: item,
//   };
// };

// const getUser = (item) => {
//   return {
//     type: actionTypes.GET,
//     palyload: item,
//   };
// };

const actions = {
  loading,
  error,
  addData,
  updateData,
  deleteData,
  loginUser,
  logoutUser,
  getData,
};

export default actions;