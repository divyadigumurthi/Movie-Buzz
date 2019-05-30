import React from "react";
import { firestore, auth, signOut } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const Footer = props => {
  const { loginStatus, user } = props;

  return (
    <footer>
      {loginStatus ? (
        <div>
          <span>
            You're logged in as {user.displayName} |{" "}
            <Link to="/" onClick={signOut}>
              Log Out!
            </Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            <Link to="login">Login</Link>
          </span>
        </div>
      )}
    </footer>
  );
};

export default Footer;
