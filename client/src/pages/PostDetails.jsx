import React, {useState, useEffect, useContext} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

import Layout from "../Layout/Layout";
// import Alert from "../common/Alert";
// import Spinner from "../common/Spinner";
import Like from "../common/Like";
import {AuthContext} from "../context/AuthProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import postService from "../services/postsService";
import useDeletePost from "../hooks/useDeletePost";
import userService from "../services/usersService";

const PostDetails = () => {
  const { id } = useParams();
  const {push} = useHistory();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const { mutate: deletePost } = useDeletePost();
  
  useEffect(() => {
    getPost(id);
  }, [id]);
  
  useEffect(() => {
    getAuthor(post.id);
  }, [post.id]);
  
  const getPost = async (id) => {
    const { data } = await postService.getPostById(id);
    setPost(data);
  }

  const getAuthor = async author_id => {
    const { data } = await userService.getUserById(author_id);
    setAuthor(data);
  } 
  
  const handleUpvote = async (post) => {
    if(user && !post.like_user_id.includes(user.id)) {
      const { data } = await postService.likePost(user.id, post.id);
      setPost(data);
    }
    if(!user) push("/login");
  }

  const handleDownvote = async post => {
    if(user && post.like_user_id.includes(user.id)) {
      const { data } = await postService.disLikePost(user.id, post.id);
      setPost(data);
    }
    if(!user) push("/login");
  }

  // if (loading) return <Spinner />;

  // if (error)
  //   return <Alert errMessage={error} severity={error ? "error" : null} />;
  return (
    <>
      {post && (
        <ErrorBoundary>
          <Layout>
            <TitleContainer>
              <Title>{post.title}</Title>
              <Subtitle>{post.sub_title}</Subtitle>
            </TitleContainer>
            <Like
              item={post}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
            {(user && user.id === author.id) && (
            <Button>
              <Link to={`/posts/${post.id}`}>Edit</Link>
            </Button>
          )}
          {(user && user.id === author.id) && (
            <Button onClick={() => deletePost(post.id)}>
            Delete
            </Button>
          )}
            <Container>
              <MDEditor.Markdown source={post.body} />
            </Container>
          </Layout>
        </ErrorBoundary>
      )}
    </>
  );
};

export default React.memo(PostDetails);

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-top: 0;
`;

const Subtitle = styled.h3`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1rem;
  text-align: center;
`;

const Container = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  padding: 0.5rem;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.3rem;
  padding: 0.3rem 0.5rem;
  &:hover {
    background-color: #ddd;
  }
`;