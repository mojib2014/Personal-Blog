import { useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import UserContext from "../userContext";
import userService from "../../services/usersService";
import auth from "../../services/authService";
import actions from "../actions/actions";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (user) => {
    dispatch(actions.loading);
    try {
      const { data } = await userService.registerUser(user);

      dispatch(actions.add(data));
      await auth.login(data.email, data.password);
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const getUserByEmail = async (email) => {
    dispatch(actions.loading);
    try {
      const { data } = await userService.getUserByEmail(email);

      dispatch(actions.getData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const login = async (email, password) => {
    dispatch(actions.loading());
    try {
      await auth.login(email, password);
      dispatch(actions.loginUser());
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        success: state.success,
        error: state.error,
        registerUser,
        getUserByEmail,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
