import {createContext, useCallback, useReducer} from "react";
import auth from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [{is_authenticated, loading, error}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const login = useCallback(
    async (email, password) => {
      dispatch({type: "loading"});
      try {
        await auth.login(email, password);

        dispatch({type: "login"});
      } catch (err) {
        dispatch({type: "error", payload: err.response.data || err.message});
      }
    },
    [dispatch],
  );

  const register = async (email, password) => {
    dispatch({type: "loading"});
    try {
      await auth.registerUser({email, password});

      dispatch({type: "register"});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const logout = useCallback(async () => {
    console.log("AuthProvider logout called");
    dispatch({type: "loading"});
    try {
      auth.logout();
      dispatch({type: "logout"});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  }, [dispatch]);
  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        is_authenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const initialState = {
  is_authenticated: false,
  loading: false,
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
        loading: false,
        error: null,
      };
    case "login":
      return {
        ...state,
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
