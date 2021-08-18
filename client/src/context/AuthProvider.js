import {createContext, useCallback, useReducer} from "react";
import auth from "../services/authService";
import reducer from "./reducer";
import actions from "./actions";

export const AuthContext = createContext();

const initialState = {
  user: null,
  is_authenticated: false,
  loading: false,
  error: null,
};

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (email, password) => {
    dispatch(actions.loading());
    try {
      const {data: token} = await auth.registerUser(email, password);
      auth.loginWithJwt(token);
      await getCurrentUser();
      dispatch(actions.register(state.user));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const login = useCallback(
    async (email, password) => {
      dispatch(actions.loading());
      try {
        await auth.login(email, password);
        await getCurrentUser();
        dispatch(actions.login(state.user));
      } catch (err) {
        dispatch(actions.error(err.response.data || err.message));
      }
    },
    [state.user],
  );

  const logout = useCallback(async () => {
    console.log("AuthProvider logout called");
    dispatch(actions.loading());
    try {
      auth.logout();
      dispatch(actions.logout());
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  }, [dispatch]);

  const getCurrentUser = async () => {
    dispatch(actions.loading());
    try {
      const user = await auth.getCurrentUser();
      dispatch(actions.getCurrentUser(user));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        is_authenticated: state.is_authenticated,
        login,
        register,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
