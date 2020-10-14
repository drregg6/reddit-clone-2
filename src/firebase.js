import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAqk7zFPSK034_4RN--GO6RRNIJGAX6AH8",
  authDomain: "reddit-clone-2-104ec.firebaseapp.com",
  databaseURL: "https://reddit-clone-2-104ec.firebaseio.com",
  projectId: "reddit-clone-2-104ec",
  storageBucket: "reddit-clone-2-104ec.appspot.com",
  messagingSenderId: "1081257686534",
  appId: "1:1081257686534:web:55d3cd74066a82e3413587"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;