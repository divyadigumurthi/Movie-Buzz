import React, { useEffect } from "react";
import { Button } from "rebass";
import { animated } from "react-spring";
import { useFetchMovieDetails } from "../Hooks/fetchMoviesHook";
import addIcon from "../Images/add.svg";
import checkedIcon from "../Images/favorite.svg";
import imdbIcon from "../Images/imdb.svg";
const MovieDetails = props => {
    const [data] = useFetchMovieDetails(
      props.match.params.id
    );
    const { hideNavBar, user, userMovies, userFavMovies, setUserFavMovies, setUserMovies, loginStatus } = props;

    hideNavBar(true);
 
    const { poster_path, title, vote_average, overview, tagline, id, imdb_id  } = data;
    const POSTER_PATH = "http://image.tmdb.org/t/p/w500";
    console.log('data '+ loginStatus);

  return (
      <>
      <animated.div style={props} key={id} className="movie-desc">
      <div class="container">
          <div class="row flex-column-reverse flex-md-row">
              <div class="col-md-12">
                <div class="row">
                      <div class="col-md-4">   
                            <div class="card-body">
                                <img class="card-img" src={`${POSTER_PATH}${poster_path}`} alt={title} />
                            </div> 
                        </div> 
                      <div class="col-md-8">
                          <div class="card-body">
                              <h1 class="card-title">{title}</h1>
                              <span>{tagline}</span>
                              <div class="container movie-fav">
                                <div class="row">
                                    <div class="col-sm-4">
                                      <i class="fa fa-star" aria-hidden="true"></i> 
                                      <p>{vote_average}/10</p>
                                    </div>
                                   <a target="_blank" href={`https://www.imdb.com/title/${imdb_id}`} ><img class="card-img" src={imdbIcon} alt={title} /></a> 
                                    <Button
                                      className="movie-add-button-sm"
                                      onClick={() => setUserMovies(data, user, loginStatus)}
                                       > 
                                      {userMovies.some(myMovie => myMovie["id"] === id) ? (
                                        <img src={checkedIcon} alt="" /> 
                                      ) : (
                                        <img src={addIcon} alt="" />
                                      )} 
                                    </Button>
                                  
                                </div>
                                
                              </div>      
                              <p class="card-text">{overview}</p>
                          </div>
                      </div>
                      </div>
                  </div>
          </div>
      </div>

    </animated.div>


  

      </>
  );
}


export default MovieDetails;