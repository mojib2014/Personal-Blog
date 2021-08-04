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
import ShareIcon from "@material-ui/icons/Share";
import formatDate from "../../utils/formatDate";
import getReadingTime from "../../utils/getReadingTime";
import Cardheader from "../CardHeader/CardHeader";
import formatSlug from "../../utils/formatSlug";
import useStyles from "./styles";

const PostCard = ({ item, author }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Cardheader item={item} author={author} />
      <CardHeader title={item.title} subheader={formatDate(item.created)} />
      <CardMedia
        className={classes.media}
        image="/images/my-image.JPG"
        title={item.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.sub_title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Typography variant="body2" color="textSecondary" component="p">
          Likes: {item.likes}
        </Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          href={`/posts/${formatSlug(item.title)}/${item.id}`}
          size="small"
          color="primary"
        >
          Read
        </Button>

        <Typography variant="body2" color="textSecondary" component="p">
          {getReadingTime(item.body)}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;

PostCard.propTypes = {
  item: PropTypes.object.isRequired,
  author: PropTypes.object,
};
