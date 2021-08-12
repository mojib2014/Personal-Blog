import React from "react";
import styled from "styled-components";
import {VscLoading} from "react-icons/vsc";

export default function Spinner() {
  return (
    <Container>
      <VscLoading size={30} color="blue" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
