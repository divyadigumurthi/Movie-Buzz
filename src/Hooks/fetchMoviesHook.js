import React, { useState, useEffect } from "react";

function useFetchMovies(
  typeOfMovies,
  setQuery,
  query = null,
  userMovies = null,
  userFavMovies = null
) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const movieEndpointURL = `https://api.themoviedb.org/3/movie/${typeOfMovies}?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&media_type=movie&page=1&primary_release_year=2019&sort_by=popularity.desc&vote_count&region=US`;

  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&query=${query}&page=1&include_adult=false`;

  const fetchMovieData = async () => {

    const dataToFetch =
      typeOfMovies === "search" ? searchURL : movieEndpointURL;
    if (typeOfMovies === "popular" || typeOfMovies === "upcoming" || typeOfMovies === "top_rated" ) {
      setQuery("");
      try {
        setLoading(true);
        const res = await fetch(dataToFetch);
        const movies = await res.json();

        setLoading(false);
        if (loading === false) {
          setMovieData(movies.results);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (typeOfMovies === "myMovies") {
      setQuery("");
      setMovieData(userMovies);
    }

    if (typeOfMovies === "search") {
      if (typeof query === "undefined" || query === "" || query === null) {
        setMovieData([]);
      } else {
        try {
          setLoading(true);
          const res = await fetch(dataToFetch);
          const movies = await res.json();

          setLoading(false);
          if (loading === false) {
            setMovieData(movies.results);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [typeOfMovies, query]);

  return [movieData, setMovieData];
  }

function useFetchMovieDetails(
  id) {
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(false);

    const movieDataURL = `https://api.themoviedb.org/3/movie/${id}?api_key=d951026be8c262501cf4a37f22f82184&language=en-US`
    const fetchMovieData = async () => {
    try {
      setLoading(true);
      const res = await fetch(movieDataURL);
      const movies = await res.json();

      setLoading(false);
      if (loading === false) {
        setMovieData(movies);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  return [movieData, setMovieData];

  }

export { useFetchMovies, useFetchMovieDetails };
