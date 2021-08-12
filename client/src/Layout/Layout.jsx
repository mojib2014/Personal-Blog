import React from "react";
import styled from "styled-components";

export default function Layout({children}) {
  return <Container className="layout">{children}</Container>;
}

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  @media (max-width: 467px) {
    width: 100%;
    max-width: 100%;
  }
`;
