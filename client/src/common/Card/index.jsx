import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "@material-ui/core";
import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import formatDate from "../../utils/formatDate";
import getReadingTime from "../../utils/getReadingTime";
import Cardheader from "../CardHeader";
import formatSlug from "../../utils/formatSlug";
import useStyles from "./styles";

import auth from "../../services/authService";

const PostCard = ({ post, onLike, onDisLike }) => {
  const [currentUser, setCurrentUser] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setCurrentUser(auth.getCurrentUser());
  }, []);

  const handleLike = (post) => {
    if (post.like_user_id.includes(currentUser.id))
      onDisLike(currentUser.id, post.id);
    else onLike(currentUser.id, post.id);
  };

  return (
    <Card className={classes.root}>
      <Cardheader post={post} />
      <CardHeader title={post.title} subheader={formatDate(post.created)} />
      <CardMedia
        className={classes.media}
        image="/images/my-image.JPG"
        title={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.sub_title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="add to favorites"
          color={
            post.like_user_id.includes(currentUser.id) ? "secondary" : "inherit"
          }
          onClick={() => handleLike(post)}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          href={`/posts/${formatSlug(post.title)}/${post.id}`}
        >
          Read
        </Button>
        <p>{getReadingTime(post.body)}</p>
      </CardActions>
    </Card>
  );
};

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDisLike: PropTypes.func.isRequired,
};
