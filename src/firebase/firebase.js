import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCyFMM5SgqhoACPG9Zm_1jECM_nmHfPv_Y",
    authDomain: "netflix-clone-8e3d5.firebaseapp.com",
    databaseURL: "https://netflix-clone-8e3d5.firebaseio.com",
    projectId: "netflix-clone-8e3d5",
    storageBucket: "netflix-clone-8e3d5.appspot.com",
    messagingSenderId: "575266645851",
    appId: "1:575266645851:web:3964bbc252d046347e9c7e"
};


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASEURL,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSINGSENDERID,
//     appId: process.env.REACT_APP_APPID
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;