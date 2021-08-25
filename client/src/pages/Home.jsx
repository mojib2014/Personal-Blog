import styled from "styled-components";

import Layout from "../Layout/Layout";
import Posts from "../components/Posts";
import Spinner from "../common/Spinner";
import usePosts from "../hooks/usePosts";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = () => {
  const {data, isLoading, isError, error} = usePosts();

  if (isLoading) return <Spinner />;

  if (!data.length) return <Paragraph>There are no posts</Paragraph>;

  return (
    <ErrorBoundary>
      {isError && (
        <details>
          <p>Something failed</p>
          <p>{error.message}</p>
        </details>
      )}
      <Layout>
        <TitleContainer>
          <Title>Trending Posts in JavaScripit & JavaScript frameworks</Title>
        </TitleContainer>
        <Posts items={data} />
      </Layout>
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
