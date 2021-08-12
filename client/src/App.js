import React, {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Switch, Route, Redirect} from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import UserProvider from "./context/UserProvider";
import AuthorProfile from "./pages/AuthorProfile";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Spinner from "./common/Spinner";
import ProtectedRoute from "./common/ProtectedRoute";
// import NOTFOUND from "./pages/404";
import ErrorFallback from "./components/ErrorFallback";
import "./App.css";

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => console.log("reseted")}
    >
      <Suspense fallback={<Spinner />}>
        <>
          <AuthProvider>
            <UserProvider>
              <Navbar />
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <ProtectedRoute path="/add-post" component={PostForm} />
                <Route path="/posts/:title/:id" component={PostDetails} />
                <Route
                  path="/author/profile/:last_name/:id"
                  component={AuthorProfile}
                />
                <ProtectedRoute path="/user/profile" component={Profile} />
                {/* <Redirect to="/" from="/posts" /> */}
                <Route exact path="/" component={Home} />
                {/* <Route path="/not-found" component={NOTFOUND} /> */}
                <Redirect to="/not-found" />
              </Switch>
            </UserProvider>
          </AuthProvider>
        </>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
