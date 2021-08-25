import {useQuery} from "react-query";
import axios from "axios";

export default function useAuthorPosts(author_id) {
  return useQuery(author_id && ["authorPosts", author_id], () =>
    axios.get(`/posts/author/posts/${author_id}`).then(res => res.data),
  );
}
