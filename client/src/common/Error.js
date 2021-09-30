import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Error({ error }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(error && true);
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return <>{isOpen ? <Div>{error}</Div> : null}</>;
}

const Div = styled.div`
  color: red;
  margin: 0.5rem 0;
`;
