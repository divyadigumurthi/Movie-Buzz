import React, { useState, useEffect } from "react";

const NavBar = props => {
  const [active, setActive] = useState(false);
  const { setNavBarLocation, navBarLocation } = props;

  useEffect(() => {
    logElement(nav1);
  }, []);

  function logElement(navLocation) {
    const activeWidth = navLocation.current.offsetWidth;
    const itemPosition = navLocation.current.offsetLeft;

    const selector = document.querySelector(".selector");
    selector.style.left = itemPosition + "px";
    selector.style.width = activeWidth + "px";
  }
  const nav0 = React.createRef();
  const nav1 = React.createRef();
  const nav2 = React.createRef();
  const nav4 = React.createRef();
  const nav5 = React.createRef();


  return (
    <div className="wrapper">
      <nav className="tabs">
        <div className="selector" />
        <a
          href="#"
          className="active"
          ref={nav0}
          className={navBarLocation === "top_rated" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("top_rated");
            logElement(nav0);
          }}
        >
          Top Rated
        </a>
        <a
          href="#"
          className="active"
          ref={nav1}
          className={navBarLocation === "popular" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("popular");
            logElement(nav1);
          }}
        >
          Popular
        </a>
        <a
          className={navBarLocation === "upcoming" ? "active" : null}
          ref={nav2}
          href="#"
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("upcoming");
            logElement(nav2);
          }}
        >
          Upcoming
        </a>
        <a
          href="#"
          ref={nav4}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("myMovies");
            logElement(nav4);
          }}
          className={navBarLocation === "myMovies" ? "active" : null}
        >
          My Favorites
        </a>

        
        <a
          href="#"
          ref={nav5}
          className={navBarLocation === "search" ? "active" : null}
          onClick={e => {
            e.preventDefault();
            setNavBarLocation("search");
            logElement(nav5);
          }}
        >
          Search
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
