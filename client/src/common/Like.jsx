import PropTypes from "prop-types";
import {FaHeart} from "react-icons/fa";
import styled from "styled-components";
import auth from "../services/authService";

export default function Like({item, onLike}) {
  return (
    <Container>
      <FaHeart
        className="fa-heart"
        aria-label="add to favorites"
        title="Add to favorites"
        color={
          auth.getCurrentUser() &&
          item.like_user_id.includes(auth.getCurrentUser().id)
            ? "#F4070A"
            : "inherit"
        }
        onClick={() => onLike(item)}
      />
      <Badge>{item.likes}</Badge>
    </Container>
  );
}

Like.propTypes = {
  item: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
};

const Container = styled.span`
  display: inline-flex;
  position: relative;
  flex-shrink: 0;
  vertical-align: middle;
  margin: 0.5rem 0;
`;

const Badge = styled.span`
  color: #fff;
  background-color: #2979ff;
  height: 20px;
  display: flex;
  padding: 0 6px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.75rem;
  min-width: 20px;
  box-sizing: border-box;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1;
  align-content: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  top: 0;
  right: 0;
  transform: scale(1) translate(50%, -50%);
  transform-origin: 100% 0%;
`;
