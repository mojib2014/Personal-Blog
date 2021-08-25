import axios from "axios";
import {useMutation, QueryClient} from "react-query";
import postService from "../services/postsService";

const queryClient = new QueryClient();

export default function useCreatePost() {
  return useMutation(
    values => { 
      console.log("values: ", values);
      return postService.savePost(values)},
    
    {
      onSuccess: () => queryClient.refetchQueries("posts"),
    },
  );
}
