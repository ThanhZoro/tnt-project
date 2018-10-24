import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

var config = {
  apiKey: "AIzaSyAVt5Gy14U1dtsX683XmEJ3wLmW-8HhesQ",
  authDomain: "tnt-project-a75b6.firebaseapp.com",
  databaseURL: "https://tnt-project-a75b6.firebaseio.com",
  projectId: "tnt-project-a75b6",
  storageBucket: "tnt-project-a75b6.appspot.com",
  messagingSenderId: "364954964637"
 };
!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider =new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase
