import firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyC8cmaOop9LI5_z7Gl5HTKrcVr80NTd2a4",
    authDomain: "reactproj-3cfcb.firebaseapp.com",
    projectId: "reactproj-3cfcb",
    storageBucket: "reactproj-3cfcb.appspot.com",
    messagingSenderId: "240878634014",
    appId: "1:240878634014:web:9b35908a8142a34df61a0f",
    measurementId: "G-9VLR0769J3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  //firebase.analytics();

  export default firebase;