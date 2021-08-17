import React, {Component} from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo});
  }

  render() {
    if (this.state.error) {
      console.log("error: mmm", this.state.error);
      return (
        <Layout>
          <Container role="alert">
            <Title>Something went wrong.</Title>
            <details>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </Container>
        </Layout>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #f8d7d9;
  color: #731c24;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #cb989b;
`;
