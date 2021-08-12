import {useReducer} from "react";
import userService from "../services/usersService";

export default function useAuthorPosts() {
  const [{userPosts, loading, err}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getUserPosts = async user_id => {
    dispatch({type: "loading"});
    try {
      const {data: userPosts} = await userService.getUserPosts(user_id);

      dispatch({type: "getUserPosts", payload: userPosts});
    } catch (err) {
      dispatch({type: "error", payload: err.response.data || err.message});
    }
  };

  return {userPosts, loading, err, getUserPosts};
}

const initialState = {
  userPosts: [],
  loading: false,
  err: null,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        loading: true,
        err: null,
      };
    case "getUserPosts":
      return {
        ...state,
        userPosts: payload,
        loading: false,
        err: null,
      };
    case "error":
      return {
        ...state,
        userPosts: [],
        loading: false,
        err: payload,
      };
    default:
      return state;
  }
};
