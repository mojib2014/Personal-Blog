import axios from "axios";
import {useQuery} from "react-query";

export default function useAuthor(author_id) {
  return useQuery(author_id && ["author_id", author_id], () =>
    axios.get(`/users/user/${author_id}`).then(res => res.data),
  );
}
