import React from "react";
import manImage from "../Images/browser.svg";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
const EmptyMovies = props => {
  const { loginStatus } = props;

  return (
    <div className="no-movies-container">
      <img src={manImage} className="top-hat-man-img" alt="Top Hat Man" />
      <div className="no-movies-message-div">
        <p>
          Hello! You haven't added any movies yet. <br />
          This is where you can see a list of the movies you've seen!
        </p>
      </div>
      {loginStatus ? null : (
        <div className="save-for-later-div">
          <p>
            Want to save your movie list for later?{" "}
            <Link to="login"> Login or Signup! </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyMovies;
