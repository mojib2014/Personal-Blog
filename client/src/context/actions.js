export const ERROR = "error";
export const LOADING = "loading";
export const REGISTER = "register";
export const GET_CURRENTUSER = "get_currentUser";
export const LOGIN = "login";
export const LOGOUT = "logout";

function loading() {
  return {
    type: LOADING,
  };
}

function error(err) {
  return {
    type: ERROR,
    payload: err,
  };
}

function register(user) {
  return {
    type: REGISTER,
    payload: user,
  };
}

function getCurrentUser(user) {
  return {
    type: GET_CURRENTUSER,
    payload: user,
  };
}
function login(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}
function logout() {
  return {
    type: LOGOUT,
  };
}

const actions = {
  loading,
  error,
  register,
  getCurrentUser,
  login,
  logout,
};

export default actions;
