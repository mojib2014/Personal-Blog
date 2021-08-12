import React, {useEffect} from "react";
import styled from "styled-components";
import Posts from "../components/Posts";
import useAuthor from "../hooks/useAuthor";
import useUserPosts from "../hooks/useUserPosts";
import SnackBar from "../common/SnackBar";
import useSnackState from "../hooks/useSnackState";
import Spinner from "../common/Spinner";
import Layout from "../Layout/Layout";

export default function Profile({match}) {
  const [author, getAuthor] = useAuthor();
  const {userPosts, loading, err, getUserPosts} = useUserPosts();
  const [open, handleClose] = useSnackState();

  /* eslint-disable  */
  useEffect(() => {
    getAuthor(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    getUserPosts(author.id);
  }, [author]);
  /* eslint-enable */

  return (
    <>
      <ProfileHeader>
        <CoverPhotoContainer>
          <CoverImage src="/images/cover.PNG" alt="mojib's avatar" />
        </CoverPhotoContainer>
        <Avatar>
          <ProfileImage src="/images/cover.PNG" alt="Author avatar" />
        </Avatar>
      </ProfileHeader>
      <div>profile info</div>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          <TitleContainer>
            <Title>{author.last_name} Posts</Title>
          </TitleContainer>
          <Posts items={userPosts} />
        </Layout>
      )}
      <SnackBar
        open={open}
        err={err}
        severity={err ? "error" : "success"}
        onClose={handleClose}
      />
    </>
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
  margin: 2.5rem auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;
