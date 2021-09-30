import PropTypes from "prop-types";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styled from "styled-components";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Like({ item, user, onLike, onDisLike, error }) {
  const handleLike = (post_id) => {
    if (item.like_user_id.includes(user.user_id)) return;
    if (!user) window.location = "/login";
    onLike(user.user_id, post_id);
  };

  const handleDislike = (post_id) => {
    if (!item.like_user_id.includes(user.user_id)) return;
    if (!user) window.location = "/login";
    onDisLike(user.user_id, post_id);
  };
  return (
    <ErrorBoundary>
      {error && <div>{error}</div>}
      <Container>
        <FaArrowUp
          aria-label="Upvote"
          title="Upvote"
          style={{ cursor: "pointer" }}
          onClick={() => handleLike(item.post_id)}
        />
        <Badge>{item.likes}</Badge>
        <FaArrowDown
          aria-label="Downvote"
          title="Downvote"
          style={{ cursor: "pointer" }}
          onClick={() => handleDislike(item.post_id)}
        />
      </Container>
    </ErrorBoundary>
  );
}

Like.propTypes = {
  item: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDisLike: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  vertical-align: middle;
  margin: 0.5rem 0;
  width: 2rem;
`;

const Badge = styled.span`
  padding: 0.5rem 0;
`;
