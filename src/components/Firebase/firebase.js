import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCri6X3n08I044n9gfo9jd-cyKwwnfDKX4",
    authDomain: "schooldatabase-bce2e.firebaseapp.com",
    databaseURL: "https://schooldatabase-bce2e.firebaseio.com",
    projectId: "schooldatabase-bce2e",
    storageBucket: "schooldatabase-bce2e.appspot.com",
    messagingSenderId: "599219714853",
    appId: "1:599219714853:web:99017ba3f300a42607b8cc",
    measurementId: "G-2R8ME3WXTY"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

    doSignOut = () => this.auth.signOut();

    // User API
    user = uid => this.db.ref(`message-chat/users/${uid}`);
    users = () => this.db.ref('message-chat/users');
    currentUser = () => this.auth.currentUser.uid;

    // Message API
    message = uid => this.db.ref(`messages/${uid}`);
    messages = () => this.db.ref('messages');
}

export default Firebase;
