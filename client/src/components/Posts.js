import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "../common/Card";
import ErrorBoundary from "./ErrorBoundary";

export default function Posts({items}) {
  if (!items.length)
    return (
      <p style={{marginTop: "156px", textAlign: "center"}}>
        You haven't posted yet!
      </p>
    );
  return (
    <ErrorBoundary>
      <GridContainer>
        {items.map(i => (
          <GridItem key={i.id}>
            <Card item={i} />
          </GridItem>
        ))}
      </GridContainer>
    </ErrorBoundary>
  );
}

Posts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const GridContainer = styled.div`
  width: calc(100% + 16px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 0;
  margin: 0;
  @media (max-width: 467px) {
    width: 100%;
  }
`;

const GridItem = styled.div`
  max-width: 25%;
  flex-basis: 25%;
  align-self: stretch;
  padding: 8px;
  @media (max-width: 1167px) {
    max-width: 30%;
    flex-basis: 30%;
  }
  @media (max-width: 960px) {
    max-width: 40%;
    flex-basis: 40%;
  }
  @media (max-width: 708px) {
    max-width: 50%;
    flex-basis: 50%;
  }
  @media (max-width: 563px) {
    max-width: 60%;
    flex-basis: 60%;
  }
  @media (max-width: 467px) {
    max-width: 100%;
    flex-basis: 100%;
  }
`;
