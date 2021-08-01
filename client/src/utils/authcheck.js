import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./context";

import axios from "axios";

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      const profile = context.authObj.userProfile;
      console.log(profile);
      context.handleUserLogin();
      context.handleUserAddProfile(profile);
      axios
        .post("/api/users/profile/create", profile)
        .then(
          axios
            .get("/api/users/profile", {
              params: { email: profile.profile.email },
            })
            .then((res) => context.handleAddDBProfile(res.data)),
        )
        .then(history.replace("/"));
    } else {
      context.handleUserLogout();
      context.handleUserRemoveProfile();
      context.handleUserRemoveProfile();
      history.replace("/");
    }
  }, [context.authObj.userProfile, context]);

  return <div></div>;
};

export default AuthCheck;
