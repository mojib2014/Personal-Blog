import {useState} from "react";
import userService from "../services/usersService";

export default function useAuthor() {
  const [author, setAuthor] = useState({});

  const getAuthor = async author_id => {
    const {data} = await userService.getUserById(author_id);
    setAuthor(data);
  };

  return [author, getAuthor];
}
