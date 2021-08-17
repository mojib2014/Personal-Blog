import React, {useEffect} from "react";
import styled from "styled-components";

import Layout from "../Layout/Layout";
import SnackBar from "../common/SnackBar";
import Posts from "../components/Posts";
import useSnackState from "../hooks/useSnackState";
import Spinner from "../common/Spinner";
import usePostsState from "../hooks/usePostsState";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = () => {
  const {posts, loading, success, error, getPosts} = usePostsState();
  const [open, handleClose, handleOpen] = useSnackState();

  /* eslint-disable */
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (error) handleOpen();
  }, [error]);

  /* eslint-enable */
  if (!success && loading) return <Spinner />;

  if (!posts.length) return <Paragraph>There are no posts</Paragraph>;

  return (
    <ErrorBoundary>
      <Layout>
        <TitleContainer>
          <Title>Trending Posts in JavaScripit & JavaScript frameworks</Title>
        </TitleContainer>
        <Posts items={posts} />
      </Layout>
      {error && (
        <SnackBar
          open={open}
          severity={error ? "error" : "success"}
          err={error}
          success={success}
          onClose={handleClose}
        />
      )}
    </ErrorBoundary>
  );
};

export default Home;

const TitleContainer = styled.div`
  margin-bottom: 88px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  padding: 0;
`;

const Paragraph = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 100px;
`;
