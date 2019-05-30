import React, { useState } from "react";
import uniqBy from "lodash.uniqby";

const LoadMoreMovies = props => {
  const [pageNum, setPageNum] = useState(2);
  const [loading, setLoading] = useState(false);
  const { movieGrid, setMovieGrid, movieType } = props;

  async function loadMore() {
  
    console.log(`the page num is: ${pageNum}`);
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieType}?api_key=d951026be8c262501cf4a37f22f82184&language=en-US&media_type=movie&page=${pageNum}&primary_release_year=2019&sort_by=popularity.desc&vote_count`
      );
      const movies = await res.json();
      const newlyFetchedMovies = await uniqBy(
        [...movieGrid, ...movies.results],
        "id"
      );

      setLoading(false);

      if (loading === false) {
        setMovieGrid(newlyFetchedMovies);
      }
      setPageNum(pageNum + 1);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="load-more-movies-div">
      <button onClick={loadMore} className="classic-button">
        {loading ? "LOADING..." : "LOAD MORE"}
      </button>
    </div>
  );
};

export default LoadMoreMovies;
