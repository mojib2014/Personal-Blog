import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import auth from "../services/authService";

export default function Like({ item, onLike }) {
  return (
    <>
      <IconButton
        aria-label="add to favorites"
        color={
          auth.getCurrentUser() &&
          item.like_user_id.includes(auth.getCurrentUser().id)
            ? "secondary"
            : "inherit"
        }
        onClick={() => onLike(item)}
      >
        <FavoriteIcon />
      </IconButton>
      {item.likes}
    </>
  );
}
