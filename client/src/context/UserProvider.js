import {createContext, useReducer, useEffect} from "react";
import userService from "../services/usersService";
import auth from "../services/authService";

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [{user, loading, error}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getUserByEmail = async email => {
    dispatch({type: "loading"});
    try {
      const {data} = await userService.getUserByEmail(email);

      dispatch({type: "getUserByEmail", payload: data});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  const getCurrentUser = async () => {
    dispatch({type: "loading"});
    try {
      const currentUser = await auth.getCurrentUser();
      dispatch({type: "getCurrentUser", payload: currentUser});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        getUserByEmail,
        getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "error":
      return {
        ...state,
        user: {},
        loading: false,
        error: payload,
      };
    case "getUserByEmail":
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case "getCurrentUser":
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
