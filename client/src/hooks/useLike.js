// import axios from "axios";
// import {useMutation, QueryClient, QueryCache} from "react-query";

// const queryCleint = new QueryClient();

// export default function useLike() {
//   return useMutation(
//     values =>
//       axios
//         .put(`/posts/post/like/${values.author}`, {post_id: values.id})
//         .then(res => res.data),
//     {
//       onSuccess: (data, variables, context) => {
//         queryCleint.refetchQueries(["posts", variables.id]);
//         queryCleint.invalidateQueries("posts");
//       },

//       onMutate: variables => {
//         const previousPost = queryCleint.getQueryData(["post", variables.id]);
//         queryCleint.setQueryData(["post", variables.id], old => ({
//           ...old,
//           ...variables,
//         }));
//         return () =>
//           queryCleint.setQueryData(["post", variables.id], previousPost);
//       },
//       onError: (error, values, rollback) => rollback(),
//     },
//   );
// }
