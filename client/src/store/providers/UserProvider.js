import { useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";
import UserContext from "../../context/userContext";
import userService from "../../services/usersService";
import authService from "../../services/authService";
import actions from "../actions/actions";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (user) => {
    try {
      dispatch(actions.loading);

      const { data } = await userService.registerUser(user);

      dispatch(actions.addData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const getUserByEmail = async (email) => {
    try {
      dispatch(actions.loading);

      const { data } = await userService.getUserByEmail(email);

      dispatch(actions.getData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const getUserById = async (user_id) => {
    try {
      dispatch(actions.loading());

      const { data } = await userService.getUserById(user_id);

      dispatch(actions.getData(data));
    } catch (err) {
      dispatch(actions.error(err.response.data || err.message));
    }
  };

  const getCurrentUser = () => {
    return authService.getCurrentUser();
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        success: state.success,
        error: state.error,
        register: registerUser,
        getUserByEmail,
        getCurrentUser,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
