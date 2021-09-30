import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "../common/Card";
import ErrorBoundary from "./ErrorBoundary";

export default function Post({ items, onDeletePost }) {
  return (
    <ErrorBoundary>
      {items.map((item) => (
        <GridItem key={item.post_id}>
          <Card item={item} onDeletePost={onDeletePost} />
        </GridItem>
      ))}
    </ErrorBoundary>
  );
}

Post.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeletePost: PropTypes.func,
};

const GridItem = styled.div`
  width: 100%;
`;
