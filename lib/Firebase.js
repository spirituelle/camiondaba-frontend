import Firebase from 'Firebase/app';
import 'Firebase/auth';

const FirebaseCredentials = {
  apiKey: "AIzaSyAlOGW2XO_OGRgli3IG3qbzRqrzjEUXtgs",
  authDomain: "camiondaba.firebaseapp.com",
  projectId: "camiondaba",
  storageBucket: "camiondaba.appspot.com",
  messagingSenderId: "235336169614",
  appId: "1:235336169614:web:e32d1c7c7abbd4d84a31df"
}
// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials)
}

export default Firebase;