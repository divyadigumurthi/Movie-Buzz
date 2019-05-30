import { useState, useEffect } from "react";

import { firestore } from "../firebase";

const useHandleUserMovies = () => {
  const [userMoviesArray, setUserMoviesArray] = useState([]);
  const setUserMovies = async (selectedMovie, user, loginStatus) => {
    const docRef = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .collection("moviesByYear")
      .doc("2019");

    if (loginStatus) {
      if (userMoviesArray.some(movie => movie["id"] === selectedMovie.id)) {
        console.log(`You clicked on: ${selectedMovie.title}`);
        docRef.get().then(doc => {
          const docData = doc.data();
          delete docData.movies[selectedMovie.id];
          const newDocData = {
            ...docData,
            movies: {
              ...docData.movies
            }
          };
          docRef.update(newDocData);
        });
      } else {
        console.log(`You clicked on: ${selectedMovie.title}`);
        await docRef.get().then(function(doc) {
          if (doc.exists) {
            console.log("The doc exist!");
            const docData = doc.data();
            const newDocData = {
              movies: {
                [selectedMovie.id]: {
                  id: selectedMovie.id,
                  title: selectedMovie.title,
                  release_date: selectedMovie.release_date,
                  poster_path: selectedMovie.poster_path,
                  adult: selectedMovie.adult
                },
                ...docData.movies
              }
            };
            docRef.update(newDocData);
            console.log(doc.data());
          }
        });
      }
    } else if (loginStatus === false) {
      if (userMoviesArray.some(movie => movie["id"] === selectedMovie.id)) {
        setUserMoviesArray(
          userMoviesArray.filter(movie => movie.id !== selectedMovie.id)
        );
      } else {
        console.log(selectedMovie);

        const newMovieObject = {
          title: selectedMovie.title,
          id: selectedMovie.id,
          release_date: selectedMovie.release_date,
          poster_path: selectedMovie.poster_path,
          adult: selectedMovie.adult
        };
        console.log(newMovieObject);
        setUserMoviesArray([...userMoviesArray, newMovieObject]);
      }
    }
  };

  return [userMoviesArray, setUserMovies, setUserMoviesArray];
};

export default useHandleUserMovies;

//     if (user !== null) {
//       db.collection("users")
//         .doc(`${user.uid}`)
//         .get()
//         .then(doc => {
//           const docData = doc.data();
//           delete docData.movies[movieObject.id];
//           const newDocData = {
//             ...docData,
//             movies: {
//               ...docData.movies
//             }
//           };
//           db.collection("users")
//             .doc(`${user.uid}`)
//             .update(newDocData);
//         });
//     }
//   } else {
//     // Add movie to myMovies list
//     this.setState({
//       // myMovies: myMovies.concat(movieObject.id),
//       myMoviesArray: [...myMoviesArray, movieObject]
//     });

//     if (user !== null) {
//       db.collection("users")
//         .doc(`${user.uid}`)
//         .get()
//         .then(doc => {
//           const docData = doc.data();
//           const newDocData = {
//             ...docData,
//             movies: {
//               [movieObject.id]: {
//                 id: movieObject.id,
//                 title: movieObject.title,
//                 release_date: movieObject.release_date
//               },
//               ...docData.movies
//             }
//           };
//           db.collection("users")
//             .doc(`${user.uid}`)
//             .update(newDocData);
//         });
//     }
//   }
// }
