import styled from "styled-components";
import Layout from "../Layout/Layout";
import Posts from "../components/posts";
import Spinner from "../common/Spinner";
import ErrorBoundary from "../components/ErrorBoundary";
import usePosts from "../hooks/usePosts";

const Home = () => {
  const { posts, loading, error } = usePosts();
  return (
    <ErrorBoundary>
      <Layout>
        <TitleContainer>
          <Title>Trending Posts in JavaScripit & JavaScript frameworks</Title>
        </TitleContainer>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div>
            <h1>Something failed</h1>
            <p>{error}</p>
          </div>
        ) : (
          <Layout>
            <Posts items={posts} />
          </Layout>
        )}
      </Layout>
    </ErrorBoundary>
  );
};

export default Home;

const TitleContainer = styled.div``;

const Title = styled.h1`
  text-align: center;
`;
