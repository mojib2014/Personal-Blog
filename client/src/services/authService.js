import http from "./httpService";
import jwtDecode from "jwt-decode";

http.setJWT(getJWT());

const registerUser = async user => {
  try {
    return await http.post("/auth/signup", user);
  } catch (err) {
    throw err;
  }
};

async function login(email, password) {
  try {
    const {data: jwt} = await http.post("/auth/login", {email, password});

    localStorage.setItem("token", jwt);
  } catch (err) {
    throw err;
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export const logout = () => {
  localStorage.removeItem("token");
};

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    delete decoded.password;
    return decoded;
  } catch (ex) {
    return null; // that means we don't have the current user.
  } // if there is an error we ignore that cause tachnically it's not our
  // application error.
}

function getJWT() {
  return localStorage.getItem("token");
}

const auth = {
  registerUser,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJWT,
};

export default auth;
