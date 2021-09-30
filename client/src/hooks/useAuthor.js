import { useState, useCallback } from "react";
import userService from "../services/usersService";

export default function useAuthor() {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthor = useCallback(async (author_id) => {
    try {
      const { data: author } = await userService.getUserById(author_id);
      setAuthor(author);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError({ error: err.reponse.data || err.message });
    }
  }, []);

  return {
    loading,
    error,
    author,
    getAuthor,
  };
}
