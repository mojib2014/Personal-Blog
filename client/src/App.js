import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "./common/Spinner";
import ProtectedRoute from "./common/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
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
    <AuthProvider>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute path="/posts/post/:post_id" component={PostForm} />
          <Route path="/post-details/:title/:post_id" component={PostDetails} />
          <ProtectedRoute path="/user/profile" component={Profile} />
          <Route path="/author/profile/:user_id" component={AuthorProfile} />
          <Route path="/not-found" component={NOTFOUND} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
