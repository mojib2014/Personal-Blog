import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import UserProvider from "./context/providers/UserProvider";
import PostProvider from "./context/providers/PostProvider";
import Posts from "./pages/Posts";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostDetails from "./pages/PostDetails/PostDetails";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
  return (
    <div className="main-app-wrapper" id="main-app-wrapper">
      <CssBaseline>
        <UserProvider>
          <PostProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/add-post" component={PostForm} />
              <Route path="/posts/:title/:id" component={PostDetails} />
              <Route
                path="/author/profile/:last_name/:id"
                component={Profile}
              />
              <Redirect to="/" from="/posts" />
            </Switch>
          </PostProvider>
        </UserProvider>
      </CssBaseline>
    </div>
  );
};

export default App;
