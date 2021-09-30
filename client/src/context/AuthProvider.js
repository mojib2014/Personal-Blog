import { createContext, useCallback, useEffect, useReducer } from "react";
import auth from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useReducer((_, action) => action, {
    loading: true,
  });

  const register = useCallback(async (email, password) => {
    try {
      const { data: token } = await auth.registerUser(email, password);
      if (token) {
        auth.loginWithJwt(token);
        const user = await auth.getCurrentUser();
        setState({ user, loading: false });
      }
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    try {
      const user = await auth.getCurrentUser();
      setState({ user, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      try {
        await auth.login(email, password);
        const user = await getCurrentUser();
        setState({ user, loading: false });
      } catch (err) {
        setState({ error: err.response.data || err.message, loading: false });
      }
    },
    [getCurrentUser],
  );

  const logout = useCallback(async () => {
    try {
      auth.logout();
      setState({ user: null, loading: false });
    } catch (err) {
      setState({ error: err.response.data || err.message, loading: false });
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
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
