import React, {useState} from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {FaCamera} from "react-icons/fa";
import Layout from "../Layout/Layout";
import Posts from "../components/Posts";
import Spinner from "../common/Spinner";
import FileInput from "../common/FileInput";
import ErrorBoundary from "../components/ErrorBoundary";
import userService from "../services/usersService";
import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import useAuthorPosts from "../hooks/useAuthorPosts";
import useAuthor from "../hooks/useAuthor";
import useDeletePost from "../hooks/useDeletePost";

export default function Profile({match}) {
  const [image, setImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const {user} = useContext(AuthContext);
  const { id } = useParams();
  const {data: author} = useAuthor(id ? id : user.id);
  const {
    data: authorPosts,
    isLoading,
    error,
  } = useAuthorPosts(id ? id : user.id);
  const { mutate: deletePost } = useDeletePost();

  const handleImageChange = e => {
    setImage(e.target.files[0]);
    setShowBtn(true);
  };

  const saveProfileImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user", JSON.stringify(user));

    try {
      await userService.updateUser(formData);
    } catch (err) {
      console.log("profile image upload: ", err);
    }
    setShowBtn(false);
  };

  return (
    <ErrorBoundary>
      {author && (
        <ProfileHeader>
          <CoverPhotoContainer>
            {author ? (
              <CoverImage
                src={author.profile_image}
                alt={`{author.last_name} avatar`}
              />
            ) : (
              <CoverImage
                src={user.profile_image}
                alt={`user.last_name avatar`}
              />
            )}
          </CoverPhotoContainer>
          <Avatar>
            <ProfileImage
              src={author.profile_image || user.profile_image}
              alt="Author avatar"
            />
            {user &&
            <form>
              <FileInput
                className="inline-fileinput"
                icon={<FaCamera />}
                id="profile_image"
                name="profile_image"
                label="Profile Image"
                onChange={handleImageChange}
              />
              {showBtn && (
                <button onClick={saveProfileImage}>Save Image</button>
              )}
            </form>
            }
          </Avatar>
        </ProfileHeader>
      )}
      <div>profile info</div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Something failed: {error}</p>
      ) : (
        <Layout>
          <TitleContainer>
            <Title>Posts</Title>
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
