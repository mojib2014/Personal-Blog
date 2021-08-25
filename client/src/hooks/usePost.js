import {useQuery} from "react-query";
import axios from "axios";

// const queryClient = new QueryClient();

export default function usePost(post_id) {
  return useQuery(post_id && ["post", post_id], () =>
    axios.get(`/posts/post/${post_id}`).then(res => res.data),
  );
}
