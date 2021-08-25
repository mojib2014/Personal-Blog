import React from "react";
import styled from "styled-components";
import {VscLoading} from "react-icons/vsc";

export default function Spinner() {
  return (
    <Container>
      <VscLoading className="spinner" size={35} color="blue" />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
