import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import Layout from "../Layout/Layout";
import Spinner from "../common/Spinner";
import Like from "../common/Like";
import ErrorBoundary from "../components/ErrorBoundary";
import Comments from "../components/Comments";
import { AuthContext } from "../context/AuthProvider";
import usePost from "../hooks/usePost.js";
import useAuthor from "../hooks/useAuthor";
import useComments from "../hooks/useComments";

const PostDetails = ({ location }) => {
  const { user } = useContext(AuthContext);
  const { post_id } = useParams();
  // post
  const { post, loading, error, getPost, deletePost, likePost, disLikePost } =
    usePost();

  useEffect(() => {
    getPost(post_id);
  }, [getPost, post_id]);

  // author
  const { author, getAuthor } = useAuthor();

  useEffect(() => {
    if (post) getAuthor(post.author);
  }, [getAuthor, post]);

  // post comments
  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
    getComments,
  } = useComments();

  useEffect(() => {
    getComments(post_id);
  }, [getComments, post_id]);

  // delete post
  const handleDeletePost = (post_id) => {
    deletePost(post_id);
    if (!error) window.location = "/";
  };

  return (
    <ErrorBoundary>
      <Layout>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {post && (
              <TitleContainer>
                <Title>{post.title}</Title>
                <Subtitle>{post.sub_title}</Subtitle>
              </TitleContainer>
            )}
            {post && (
              <Like
                item={post}
                user={user}
                onLike={likePost}
                onDisLike={disLikePost}
                error={error}
                location={location}
              />
            )}
            {user && user.user_id === author.user_id && (
              <Button>
                <Link to={`/posts/post/${post.post_id}`}>Edit</Link>
              </Button>
            )}
            {user && user.user_id === author.user_id && (
              <Button onClick={() => handleDeletePost(post.post_id)}>
                Delete
              </Button>
            )}
            <Container>
              {post && <MDEditor.Markdown source={post.body} />}
            </Container>
          </>
        )}
        {commentsLoading ? (
          <div>Loading...</div>
        ) : commentsError ? (
          <div>{commentsError}</div>
        ) : (
          <Comments comments={comments} />
        )}
      </Layout>
    </ErrorBoundary>
  );
};

export default PostDetails;

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
