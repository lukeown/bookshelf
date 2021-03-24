// FIREBASE CONFIG & INITIALIZATION
const firebaseConfig = {
    apiKey: "AIzaSyDmFQRHyrkl3nmQfXinWKE7ulL23l-2fH0",
    authDomain: "bookshelf-e44a7.firebaseapp.com",
    databaseURL: "https://bookshelf-e44a7-default-rtdb.firebaseio.com/",
    projectId: "bookshelf-e44a7",
    storageBucket: "bookshelf-e44a7.appspot.com",
    messagingSenderId: "936112938208",
    appId: "1:936112938208:web:078603093fb8e1eb0fc485"
};
firebase.initializeApp(firebaseConfig);
const bookshelfDatabase = firebase.database().ref();

//Register User
function registerUser() {
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    firebase.auth().createUserWithEmailAndPassword(email, password) 
    console.log(email, password)
}
//Sign In
function signIn() {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password) 
    console.log(email, password)
}
//Sign Out
function signOut() {
    event.preventDefault()
    firebase.auth().signOut();

}
//Update user state
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
})
