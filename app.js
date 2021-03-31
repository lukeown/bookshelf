// ---== TO DO ==---
//
// [DONE] USER AUTHENTICATION VIA FIREBASE
// [] MEDIA QUERIES
// [] NAV BAR
// [] DATES ISSUE
// [] PERSONAL BOOKSHELVES
// [] PERSONAL READING STATS
// [] ABOUT PAGE
// [] IMAGE PROBLEM (PLACEHOLDER)
// [] SPEED UP XHR REQUEST?

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


let user
//Register User
function registerUser() {
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        console.log('Redirecting')
        window.location.href = "index.html"
    })
    .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;

            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email format')
            } else if (errorCode === 'auth/email-already-in-use') {
                alert('Email address already in use')
            }
    }) 
    console.log(email, password)
}
//Sign In
function signIn() {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            console.log('Redirecting')
            window.location.href = "index.html"
        })
        .catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;

                if (errorCode === 'auth/user-not-found') {
                    alert('User not found')
                } else if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password')
                }
        })
    console.log(email, password)
}
//Sign Out
function signOut() {
    firebase.auth().signOut();

}
//Update user state
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
})

