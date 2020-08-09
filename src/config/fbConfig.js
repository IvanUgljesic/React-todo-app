import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyA7Sc7DR8L6mAX9uKBZc6x20MNy5nyzeqI",
authDomain: "dex-todo-app.firebaseapp.com",
databaseURL: "https://dex-todo-app.firebaseio.com",
projectId: "dex-todo-app",
storageBucket: "dex-todo-app.appspot.com",
messagingSenderId: "909769588292",
appId: "1:909769588292:web:f93eb80c1f80d008024611",
measurementId: "G-SE7CLTR82E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//firebase.firestore().settings({ timestampsInSnapshots: true})

export default firebase;