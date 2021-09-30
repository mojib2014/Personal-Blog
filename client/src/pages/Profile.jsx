import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";
import Layout from "../Layout/Layout";
import Posts from "../components/posts";
import Spinner from "../common/Spinner";
import FileInput from "../common/FileInput";
import ErrorBoundary from "../components/ErrorBoundary";
import useUser from "../hooks/useUser";
import { deletePost } from "../features/post/postSlice";
import { AuthContext } from "../context/AuthProvider";
import useAuthorPosts from "../hooks/useAuthorPosts";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const {
    loading: userLoading,
    error: userError,
    user,
    getUserById,
    updateUser,
  } = useUser();
  const { loading, error, authorPosts, getAuthorPosts } = useAuthorPosts();
  const [image, setImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (currentUser) getUserById(currentUser.user_id);
  }, [getUserById, currentUser]);

  useEffect(() => {
    if (user) getAuthorPosts(user.user_id);
  }, [getAuthorPosts, user]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setShowBtn(true);
  };

  const saveProfileImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    formData.append("item", JSON.stringify(currentUser));

    updateUser(currentUser.user_id, formData);

    setShowBtn(false);
  };

  return (
    <ErrorBoundary>
      {userLoading ? (
        <div>Loading...</div>
      ) : userError ? (
        <div>{userError}</div>
      ) : (
        <ProfileHeader>
          {user && (
            <CoverPhotoContainer>
              <CoverImage
                src={user.profile_image}
                alt={`${user.last_name} avatar`}
              />
            </CoverPhotoContainer>
          )}
          {user && (
            <Avatar>
              <ProfileImage
                src={user.profile_image}
                alt={`${user.last_name} avatar`}
              />
              <form encType="multipart/form-data">
                <FileInput
                  className="inline-fileinput"
                  icon={<FaCamera className="fa-camera" />}
                  id="profile_image"
                  name="profile_image"
                  label="Profile Image"
                  onChange={handleImageChange}
                />
                {showBtn && (
                  <button onClick={saveProfileImage}>Save Image</button>
                )}
              </form>
            </Avatar>
          )}
        </ProfileHeader>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Layout>
          <ProfileInfoContainer>
            <h1>profile info</h1>
          </ProfileInfoContainer>
          <TitleContainer>
            <Title>Your Posts</Title>
          </TitleContainer>
          <Posts items={authorPosts} onDeletePost={deletePost} />
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
  max-width: 100%;
  height: 400px;
  max-height: 30%;
  display: block;
  object-fit: cover;
`;

const Avatar = styled.div`
  position: relative;
  border-radius: 50%;
  margin-top: -75px;
  width: 160px;
  height: 160px;
  padding: 0;
  border: 3.5px solid var(--secondary-color);
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

const Title = styled.h1``;

const ProfileInfoContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;
