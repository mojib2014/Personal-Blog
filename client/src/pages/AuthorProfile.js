import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Posts from "../components/posts";
import Spinner from "../common/Spinner";
import Layout from "../Layout/Layout";
import useAuthor from "../hooks/useAuthor";
import useAuthorPosts from "../hooks/useAuthorPosts";

export default function AuthorProfile() {
  const { user_id } = useParams();
  const {
    loading: authorLoading,
    error: authorError,
    author,
    getAuthor,
  } = useAuthor();
  const { loading, error, authorPosts, getAuthorPosts } = useAuthorPosts();

  useEffect(() => {
    if (user_id) getAuthor(user_id);
  }, [getAuthor, user_id]);

  useEffect(() => {
    if (user_id) getAuthorPosts(user_id);
  }, [getAuthorPosts, user_id]);

  return (
    <ErrorBoundary>
      {authorLoading ? (
        <Layout>
          <p>Loading...</p>
        </Layout>
      ) : authorError ? (
        <Layout>
          <p>{authorError}</p>
        </Layout>
      ) : (
        <ProfileHeader>
          <CoverPhotoContainer>
            <CoverImage src={author.profile_image} alt="Author avatar" />
          </CoverPhotoContainer>
          <Avatar>
            <ProfileImage src={author.profile_image} alt="Author avatar" />
          </Avatar>
        </ProfileHeader>
      )}
      <Layout>
        <ProfileInfoContainer>
          <h1>profile info</h1>
        </ProfileInfoContainer>
      </Layout>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Layout>
          <TitleContainer>
            <Title>{author.last_name} Posts</Title>
          </TitleContainer>
          <Posts items={authorPosts} author={author} />
        </Layout>
      )}
    </ErrorBoundary>
  );
}

const ProfileHeader = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  height: 30%;
  max-height: 30%;
  marign: 0;
  margin-top: 56px;
  padding: 0;
`;

const CoverPhotoContainer = styled.div`
  background-color: #ddd;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  justify-self: center;
  height: 30%;
  width: 100%;
  max-height: 30%;
  max-width: 100%;
  padding: 0;
`;

const CoverImage = styled.img`
  width: auto;
  height: 400px;
  max-height: 30%;
  display: block;
  object-fit: cover;
`;

const Avatar = styled.div`
  border-radius: 50%;
  margin-top: -75px;
  width: 160px;
  height: 160px;
  padding: 0;
  border: 3.5px solid #f44336;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 2.5rem 0;
  margin-bottom: 5rem;
`;

const Title = styled.h1``;

const ProfileInfoContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;
