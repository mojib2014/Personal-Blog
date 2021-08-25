import axios from "axios";
import {useMutation, QueryClient} from "react-query";

const queryClient = new QueryClient();

export function useDisLike() {
  return useMutation(
    values =>
      axios
        .put(`/posts/post/dislike/${values.author}`, {post_id: values.id})
        .then(res => res.data),
    {
      onMutate: values => {
        const previousPost = queryClient.getQueryData(["post", values.id]);

        queryClient.setQueryData(["post", values.id], old => ({
          ...old,
          ...values,
        }));
        return () =>
          queryClient.setQueryData(["post", values.id], previousPost);
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: async values => {
        queryClient.refetchQueries("post");
        await queryClient.refetchQueries(["post", values.id]);
      },
    },
  );
}
