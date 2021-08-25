import React from "react";
import styled from "styled-components";

export default function PrimaryButton({onClick, type, children}) {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  align-items: center;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3f51b5;
  color: #fff;
  cursor: pointer;
  display: flex;
  user-select: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.875rem;
  flex-direction: column;
  font-weight: 500;
  padding: 6px 16px;
  min-width: 64px;
  margin: 0 auto;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  tex-align: center;
  &:hover {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    background-color: #303f9f;
  }
  &:active {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  }
`;
