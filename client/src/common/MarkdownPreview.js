import React from "react";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownPreview({text}) {
  return (
    <Container>
      <MDEditor.Markdown source={text} />
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 0 1px 7px rgb(0 0 0 / 19%);
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  height: auto;
  padding: 0.8rem;
`;
