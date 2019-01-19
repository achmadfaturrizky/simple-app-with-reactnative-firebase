import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
const config={
			apiKey: "AIzaSyDr0hazCMIPi2CDh_qqBSlFCkhNiUVLbBc",
		    authDomain: "collaborate-49bf3.firebaseapp.com",
		    databaseURL: "https://collaborate-49bf3.firebaseio.com",
		    projectId: "collaborate-49bf3",
		    storageBucket: "collaborate-49bf3.appspot.com",
		    messagingSenderId: "233990089099",
}
const Firebase = firebase.initializeApp(config);
export default Firebase;

