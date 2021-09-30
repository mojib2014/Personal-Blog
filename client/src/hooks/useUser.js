import { useReducer, useCallback } from "react";
import usersService from "../services/usersService";

export default function useUser() {
  const [state, setState] = useReducer((_, action) => action, {
    loading: true,
  });

  const getUserById = useCallback(async (user_id) => {
    try {
      const { data: user } = await usersService.getUserById(user_id);
      setState({ user, loading: false });
    } catch (err) {
      setState({ error: err.resonse.data || err.message, loading: false });
    }
  }, []);

  const updateUser = useCallback(async (user_id, formData) => {
    try {
      const { data: user } = await usersService.updateUser(user_id, formData);
      setState({ user, loading: false });
    } catch (err) {
      setState({ error: err.resonse.data || err.message, loading: false });
    }
  }, []);

  return {
    ...state,
    getUserById,
    updateUser,
  };
}
