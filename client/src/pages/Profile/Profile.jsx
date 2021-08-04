import React, { useEffect, useContext, useState } from "react";
import { Container, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import AuthorPosts from "../../components/AuthorPosts/AuthorPosts";
import { PostContext } from "../../context/postContext";
import userService from "../../services/usersService";

export default function Profile({ match }) {
  const { authorPosts, error, success, getAuthorPosts } =
    useContext(PostContext);
  const [author, setAuthor] = useState({});
  const classes = useStyles();

  /* eslint-disable */
  useEffect(() => {
    getAuthorPosts(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    const author = await userService.getUserById(authorPosts[0].author);
    setAuthor(author);
  };

  return (
    <Container className={`${classes.root} profile-container`}>
      <Container className={`profile-header ${classes.profileHeader}`}>
        <Container
          className={`cover-photo-container ${classes.coverPhotoContainer}`}
        >
          <img
            className={classes.img}
            src="/images/cover.PNG"
            alt="mojib's avatar"
          />
        </Container>
        <Avatar className={classes.avatarContainer}>
          <img
            style={{ width: "auto", height: "100%", borderRadius: "50%" }}
            src="/images/cover.PNG"
            alt=""
          />
        </Avatar>
        <Container>profile info</Container>
        <AuthorPosts
          items={authorPosts}
          author={author}
          error={error}
          success={success}
        />
      </Container>
    </Container>
  );
}
