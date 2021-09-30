import styled from "styled-components";
import PropTypes from "prop-types";
import Post from "./Post";
import ErrorBoundary from "./ErrorBoundary";

export default function Posts({ items, onDeletePost }) {
  return (
    <ErrorBoundary>
      <GridContainer>
        <Post items={items} onDeletePost={onDeletePost} />
      </GridContainer>
    </ErrorBoundary>
  );
}

Posts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onDeletePost: PropTypes.func,
};

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  grid-template-rows: auto;
  grid-gap: 2.5rem;
  justify-content: center;
  margin: 0 auto;
`;
