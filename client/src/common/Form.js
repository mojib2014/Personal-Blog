import React from "react";
import styled from "styled-components";

export default function Form({onSubmit, children}) {
  return <FormCompo onSubmit={onSubmit}>{children}</FormCompo>;
}

const FormCompo = styled.form`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 7px rgb(0 0 0 / 19%);
  width: 50%;
  height: 100%;
  margin: auto;
  padding: 0.8rem;
`;
