import React from "react";
import { Container } from "@material-ui/core";

export default function SmallerContainer({ children }) {
  return <Container maxWidth="md">{children}</Container>;
}
