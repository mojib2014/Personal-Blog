import {useCallback, useReducer} from "react";
import auth from "../services/authService";

export default function useAuth() {
  const [{user, is_authenticated, loading, error}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getCurrentUser = async () => {
    dispatch({type: "loading"});
    try {
      const user = await auth.getCurrentUser();

      dispatch({type: "getCurrentUser", payload: user});
    } catch (err) {
      dispatch({type: "error", payload: err.message});
    }
  };

  const registerUser = useCallback(
    async user => {
      dispatch({type: "loading"});
      try {
        const {data} = await auth.registerUser(user);

        dispatch({type: "register", payload: data});
        const {data: token} = await auth.login(data.email, data.password);
        dispatch({type: "login", payload: token});
      } catch (err) {
        dispatch({type: "error", payload: err.response.data || err.message});
      }
    },
    [dispatch],
  );

  const login = useCallback(
    async (email, password) => {
      dispatch({type: "loading"});
      try {
        await auth.login(email, password);
        const user = await auth.getCurrentUser();
        dispatch({type: "login", payload: user});
      } catch (err) {
        dispatch({type: "error", payload: err.response.data || err.message});
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    dispatch({type: "loading"});
    try {
      await auth.logout();
      dispatch({type: "logout"});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  }, [dispatch]);

  return {
    user,
    is_authenticated,
    loading,
    error,
    getCurrentUser,
    registerUser,
    login,
    logout,
  };
}

export const initialState = {
  user: null,
  is_authenticated: false,
  loading: false,
  success: false,
  error: null,
};

export const reducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        is_authenticated: false,
        loading: true,
        error: null,
      };
    case "error":
      return {
        ...state,
        is_authenticated: false,
        loading: false,
        error: payload,
      };
    case "register":
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        error: null,
      };
    case "getCurrentUser":
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        error: null,
      };
    case "login":
      return {
        ...state,
        user: payload,
        is_authenticated: true,
        loading: false,
        error: null,
      };
    case "logout":
      return {
        ...state,
        user: null,
        loading: false,
        is_authenticated: false,
        error: null,
      };
    default:
      return state;
  }
};
