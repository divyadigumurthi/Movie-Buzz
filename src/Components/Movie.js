import React, { useState } from "react";
import { Button } from "rebass";
import { useTransition, animated } from "react-spring";

import {
  BrowserRouter as Router,
  Link

} from "react-router-dom";

import addIcon from "../Images/add.svg";
import checkedIcon from "../Images/favorite.svg";
const POSTER_PATH = "http://image.tmdb.org/t/p/w500";

const Movie = props => {
  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const { movie, userMovies, setUserMovies, loginStatus, user } = props;

  return transitions.map(({ item, key, props }) => (
    <animated.div style={props} key={movie.id} className="movie-container">
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      <span>  Rating : <i className="fas fa-star" /> {movie.vote_average}/10</span>
      <Button variant="primary" mt={4} as={Link} to={`/movie/${movie.id}`}>
        Details
      </Button>
      <button
      className="movie-add-button"
        onClick={() => setUserMovies(movie, user, loginStatus)}
      >
        {userMovies.some(myMovie => myMovie["id"] === movie.id) ? (
          <img src={checkedIcon} alt="" />
        ) : (
          <img src={addIcon} alt="" />
        )}
      </button>
     
    </animated.div>
  ));
};

export default Movie;
