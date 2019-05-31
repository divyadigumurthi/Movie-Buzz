import React, { useState, useEffect, lazy } from "react";

import Header from "./Components/Header";
import MovieGrid from "./Components/MovieGrid";
import useHandleUserMovies from "./Hooks/handleUserMoviesHook";
import Login from "./Components/Login";
import MovieDetails from "./Components/MovieDetails";
import firebase from "./firebase";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [userMovies, setUserMovies, setUserMoviesArray] = useHandleUserMovies(
    user,
    loginStatus
  );
  const [navBarLocation, setNavBarLocation] = useState("popular");
  const [query, setQuery] = useState("");
  const [introPage, setIntroPage] = useState(false);

  let unsbuscribeFromFirestore = null;

  useEffect(() => {
    let unsbuscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async userData => {
        if (userData) {
          const usersRef = firebase
            .firestore()
            .collection("users")
            .doc(`${userData.uid}`);

          await usersRef
            .get()
            .then(userDoc => {
              if (userDoc.exists) {
                console.log("The user that just logged in ALREADY exist! 🤓");
              } else {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .set({
                    name: userData.providerData[0].displayName,
                    lastSignInTime: userData.metadata.lastSignInTime,
                    provider: userData.providerData[0].providerId
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .collection("userInfo")
                  .doc("metadata")
                  .set({
                    displayName: userData.displayName,
                    email: userData.email,
                    phone: userData.phoneNumber,
                    creationTime: userData.metadata.creationTime,
                    lastSignInTime: userData.metadata.lastSignInTime,
                    provider: userData.providerData[0].providerId
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .doc(`${userData.uid}`)
                  .collection("moviesByYear")
                  .doc("2019")
                  .set({
                    movies: {}
                  });
                console.log(user);
                console.log(
                  `A user with the name ${
                  user.displayName
                  } was created with the email ${user.email}`
                );

              }
            })
            .then(() => {
              const docRef = firebase
                .firestore()
                .collection("users")
                .doc(`${userData.uid}`)
                .collection("moviesByYear")
                .doc("2019");

              docRef.onSnapshot(function (snapshot) {
                console.log("NEW SNAPSHOT!");
                console.log(snapshot.data().movies);
                setUserMoviesArray(Object.values(snapshot.data().movies));
              });

              setUser(userData);
              setLoginStatus(true);

              console.log(userData);
              console.log("There is a user logged in!");
            });
        } else {
          setUser({});
          setLoginStatus(false);
          setUserMoviesArray([]);
          console.log("No user is signed in...");
        }
      });
    return () => {
      unsbuscribeFromAuth();
    };
  }, []);

  return (
    <Router>
      <Header
        setNavBarLocation={setNavBarLocation}
        navBarLocation={navBarLocation}
        setQuery={setQuery}
        introPage={introPage}
        loginStatus={loginStatus}
        user={user}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MovieGrid
              movieType={navBarLocation}
              query={query}
              setQuery={setQuery}
              user={user}
              loginStatus={loginStatus}
              userMovies={userMovies}
              setUserMovies={setUserMovies}
              hideNavBar={setIntroPage}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <Login setUser={setUser} hideNavBar={setIntroPage} />}
        />
        <Route
          exact
          path="/movie/login"
          render={() => <Login setUser={setUser} hideNavBar={setIntroPage} />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <MovieDetails {...props} 
          hideNavBar={setIntroPage} 
          user={user} 
          userMovies={userMovies} 
          setUserMovies={setUserMovies} 
          loginStatus={loginStatus}/>}
        />
      </Switch>
    </Router>
  );
};

export default App;
