import PropTypes from "prop-types";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import styled from "styled-components";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Like({item, onUpvote, onDownvote}) {
  return (
    <ErrorBoundary>
      <Container>
        <FaArrowUp
          aria-label="Upvote"
          title="Upvote"
          style={{cursor: "pointer"}}
          onClick={() => onUpvote(item)}
        />
        <Badge>{item.likes}</Badge>
      </Container>
      <FaArrowDown
        aria-label="Downvote"
        title="Downvote"
        style={{cursor: "pointer"}}
        onClick={() => onDownvote(item)}
      />
    </ErrorBoundary>
  );
}

Like.propTypes = {
  item: PropTypes.object.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  vertical-align: middle;
  margin: 0.5rem 0;
  width: 2rem;
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
  top: -4px;
  right: 0;
  transform: scale(1) translate(50%, -50%);
  transform-origin: 100% 0%;
`;
