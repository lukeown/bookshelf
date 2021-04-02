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
var db = firebase.firestore();

let book

function addBook(book) {
    db.collection('relations').add({
        email: userEmail,
        bookCover: book.cover,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookDate: book.date
    })
    .then(() => {
        console.log(`Book ${book.title} saved to collection!`)
    })
    .catch((error) => {
        console.error('Error writing to Firestore: ', error)
    })
}

function myBooks() {
    document.getElementById('card').innerHTML = '';
    document.getElementById('loadConfirm').innerHTML = 'Loading your bookshelf';
    let userEmail = document.getElementById('shelfEmail').value
    db.collection('relations').where('email', '==', userEmail)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                document.getElementById('card').innerHTML += // fill in card structure and content from firestore
                    `
                        <div class="card mb-3" id="card-shell">
                            <div class="row g-0" id="card-item">
                                <div class="col-md-4" id="card-image">
                                    <img src='${(doc.id, " => ", doc.data()).bookCover}' class='bookCover'/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body" id="card-body">
                                        <h5>${(doc.id, " => ", doc.data()).bookTitle}</h5> 
                                        <p>${(doc.id, " => ", doc.data()).bookAuthor}</p>
                                        <p>${(doc.id, " => ", doc.data()).bookDate}</p>  
                                    </div>
                                </div>
                            </div>
                        </div>    
                    `
            })
        })
        .catch((error) => {
            console.error('Error reading from Firestore: ', error)
        })
}



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

            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email format')
            } else if (errorCode === 'auth/email-already-in-use') {
                alert('Email address already in use')
            } else {
                alert('Password must be at least 6 characters')
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
            alert(`Welcome ${email}. Redirecting to Book Search`)
            document.getElementById('sign-in').innerHTML = `Sign Out as ${user.email}`
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
    userEmail = user.email
    console.log(user)
    console.log(`Logged in as ${user.email}`)
    document.getElementById('sign-in').innerHTML = `Sign Out as ${user.email}`
    document.getElementById('sign-out').onClick = signOut()
    return userEmail
})
//Anonymous Bypass
function anonymousRedirect() {
    event.preventDefault()
    window.location.href = 'myShelf.html'
}
function userButtonHandler() {
    if (userEmail !== (null || undefined)) {
        document.getElementById('sign-in').innerHTML = `Sign Out as ${userEmail}`
    } else {
        document.getElementById('sign-in').innerHTML = 'Sign In'
    }
}
userButtonHandler()

