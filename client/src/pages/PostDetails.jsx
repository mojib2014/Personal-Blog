import React, {useEffect} from "react";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

import Layout from "../Layout/Layout";
import Alert from "../common/Alert";
import Spinner from "../common/Spinner";
import Like from "../common/Like";
import usePostsState from "../hooks/usePostsState";
import ErrorBoundary from "../components/ErrorBoundary";

const PostDetails = ({match}) => {
  const {posts, error, loading, getPosts, handleLike} = usePostsState();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPost = posts.filter(post => post.id === +match.params.id)[0];

  if (loading) return <Spinner />;

  if (error)
    return <Alert errMessage={error} severity={error ? "error" : null} />;

  return (
    <>
      {selectedPost && (
        <ErrorBoundary>
          <Layout>
            <TitleContainer>
              <Title>{selectedPost.title}</Title>
              <Subtitle>{selectedPost.sub_title}</Subtitle>
            </TitleContainer>
            <Like item={selectedPost} onLike={handleLike} />
            <Container>
              <MDEditor.Markdown source={selectedPost.body} />
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
