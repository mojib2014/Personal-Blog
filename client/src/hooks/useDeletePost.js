import axios from "axios";
import {useMutation, QueryClient} from "react-query";

const queryClient = new QueryClient();

export default function useDeletePost() {
  return useMutation(
    postId => axios.delete(`/posts/post/${postId}`).then(res => res.data),
    {
      onSuccess: () => queryClient.refetchQueries("posts"),
    },
  );
}
