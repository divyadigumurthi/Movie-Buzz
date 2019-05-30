import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCooo1VRVb2VMme16mq-EKZ5F01SKmUQxU",
  authDomain: "moviebuzz-37f7e.firebaseapp.com",
  databaseURL: "https://moviebuzz-37f7e.firebaseio.com",
  projectId: "moviebuzz-37f7e",
  storageBucket: "gs://moviebuzz-37f7e.appspot.com",
  messagingSenderId: "52739898697"
};
firebase.initializeApp(config);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const signOut = () => auth.signOut();

const authHandler = async authData => {
  const user = authData.user;
  const usersRef = firestore.collection("users").doc(`${user.uid}`);

  try {
    await usersRef.get().then(userDoc => {
      if (userDoc.exists) {
        console.log(`This user already exist! 🙏`);
      } else {
        firestore
          .collection("users")
          .doc(`${user.uid}`)
          .set({
            name: user.providerData[0].displayName
          });

        firestore
          .collection("users")
          .doc(`${user.uid}`)
          .collection("userInfo")
          .doc("metadata")
          .set({
            displayName: user.providerData[0].displayName,
            email: user.providerData[0].email,
            phone: null,
            photo: null,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            provider: user.providerData[0].providerId
          });

        firestore
          .collection("users")
          .doc(`${user.uid}`)
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

        firestore
        .collection("users")
        .doc(`${user.uid}`)
        .collection("moviesByFav")
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
    });
  } catch (error) {
    console.error(error);
  }
};

export const authenticate = provider => {
  const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  firebase.auth().signInWithPopup(authProvider);
  // .then(authHandler);

  console.log("YAY!");
};

export default firebase;
