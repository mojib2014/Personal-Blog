import React from "react";
import styled from "styled-components";

export default function Title({children}) {
  return <Header>{children}</Header>;
}

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
  text-align: center;
`;
