import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import LoadMoreMovies from "./LoadMoreMovies";
import EmptyMovies from "./EmptyMovies";


import { useFetchMovies } from "../Hooks/fetchMoviesHook";

const MovieGrid = props => {
  const [movieGrid, setMovieGrid] = useFetchMovies(
    props.movieType,
    props.setQuery,
    props.query,
    props.userMovies
  );

  const {
    userMovies,
    setUserMovies,
    loginStatus,
    user,
    movieType,
    hideNavBar
  } = props;


  hideNavBar(false);

  return (
    <div>
      {movieType === "myMovies" && userMovies.length === 0 ? (
        <EmptyMovies loginStatus={loginStatus} />
      ) : (
        <div className="movie-grid-container">
          {movieGrid
            .filter(movie => movie.adult === false)
            .map(movie => (
              <Movie
                key={movie.id}
                user={user}
                movie={movie}
                loginStatus={loginStatus}
                userMovies={userMovies}
                setUserMovies={setUserMovies}
                navBarLocation={movieType}
              />
            ))}
        </div>
      )}
      {movieType === "popular" || movieType === "upcoming" || movieType === "top_rated"  ? (
        <LoadMoreMovies
          movieGrid={movieGrid}
          setMovieGrid={setMovieGrid}
          movieType={movieType}
        />
      ) : null}
    </div>
  );
};

export default MovieGrid;
