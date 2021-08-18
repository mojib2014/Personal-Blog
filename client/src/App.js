import React, {Suspense, lazy} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import Spinner from "./common/Spinner";
import ProtectedRoute from "./common/ProtectedRoute";
import "./App.css";
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const Home = lazy(() => import("./pages/Home"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const PostForm = lazy(() => import("./components/PostForm"));
const Navbar = lazy(() => import("./components/Navbar"));
const PostDetails = lazy(() => import("./pages/PostDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const NOTFOUND = lazy(() => import("./pages/404"));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <>
        <AuthProvider>
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
            <Route exact path="/" component={Home} />
            <Route path="/not-found" component={NOTFOUND} />
            <Redirect to="/not-found" />
          </Switch>
        </AuthProvider>
      </>
    </Suspense>
  );
};

export default App;
