import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { firestore, auth, signOut } from "../firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import logo from "../Images/movie.svg";

const Header = props => {
  const { setNavBarLocation, setQuery, introPage, navBarLocation,loginStatus, user } = props;
  return (
    <header>

      <div>
      <a href="/">
        <h3>MOVIE BUZZ
           <img  src={logo} className="site-hero-logo" alt="movie-logo" />
      </h3> </a>
      <div class="loginclass">
      {loginStatus ? (
        <div>
          <span>
             {user.displayName} |{" "}
            <button to="/" onClick={signOut} className="classic-button-sm">
              Log Out!
            </button>
          </span>
        </div>
      ) : (
        <div>
          <span>
            <Link className="classic-button-sm" to="login">Login</Link>
          </span>
        </div>
      )}

      </div>

      {introPage ? null : (
        <>
          <NavBar
            setNavBarLocation={setNavBarLocation}
            navBarLocation={navBarLocation}
          />
          {/* <SearchBar setQuery={setQuery} /> */}
        </>
      )}
      {navBarLocation === "search" ? <SearchBar setQuery={setQuery} /> : null}
      </div>



    </header>
  );
};

export default Header;
