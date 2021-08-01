import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import UserProvider from "./store/providers/UserProvider";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostDetails from "./pages/PostDetails/PostDetails";
import "./App.css";

const App = () => {
  return (
    <div className="main-app-wrapper" id="main-app-wrapper">
      <CssBaseline />
      <UserProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/add-post" component={PostForm} />
          <Route path="/posts/:title/:id" component={PostDetails} />
          <Redirect to="/" from="/posts" />
        </Switch>
      </UserProvider>
    </div>
  );
};

export default App;
