import axios from "axios";
import {useMutation, QueryClient} from "react-query";

const queryClient = new QueryClient();

export default function useSavePost() {
  return useMutation(
    values =>
      axios.patch(`/posts/post/${values.id}`, values).then(res => res.data),
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
        queryClient.refetchQueries("posts");
        await queryClient.refetchQueries(["post", values.id]);
      },
    },
  );
}
