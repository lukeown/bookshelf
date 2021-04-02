// Site needs to let users:
// - search books
// - view book results returned from the search
// - add books to their own bookshelf -- figure out how to return books first
// ---- books will be saved to personal bookshelves (firebase user authentication and firestore)

// Search 
// - user submits input form
// - event listener sees submission and calls the fetchBooks function
// - fetchBooks function searches the openbooks API using the value of the input field
// - response of the API search is returned
// - returned response is plugged into the DOM


async function searchBooks() {
    event.preventDefault()
    clear()
    
    let bookResult = [] 
    let userInput = document.getElementById('input').value;
    document.getElementById('searchConfirm').innerHTML = `Searching for: ${userInput} <br> Books will take a few seconds to load (uses third party API) <br> If response takes more than 5 seconds, please refresh and retry search.`
    const response =  await fetch(`https://openlibrary.org/search.json?title=${userInput}`)
    let book = await response.json()
    console.log(book)

    let bookCoverRequest = []
    let bookCover= []
    for (let i=0; i<5; i++) {
        bookCoverRequest = await fetch(`https://covers.openlibrary.org/b/isbn/${book.docs[i].isbn[0]}-M.jpg`)
        bookCover.push(bookCoverRequest.url)
    }

    for (let i = 0; i < 5; i++) { // Pushes the first 5 search results to the bookResult array
        bookResult.push({cover: bookCover[i], title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})
        bookList.push({cover: bookCover[i], title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})

    }
    document.getElementById('searchConfirm').innerHTML = `Showing results for: ${userInput}`
    generateCard(bookResult)
}

// generateCard function takes the books array and throws the information to render into the card div
// also creates an img element within the 'card' div, using the url stored bookResult.cover, which is then passed into the generateCard function as bookList.cover
// then checks that the book cover image is valid (over 1x1px) - if not, replaces with a placeholder (defaultCover)
const defaultCover = './placeholder-image.png'
let bookList = []
function generateCard(bookList) { 

    document.getElementById('card').innerHTML = '';

    for (let i = 0; i < bookList.length; i++) { 
    //for every book, make a card and fill in the info
        document.getElementById('card').innerHTML += // fill in card structure and content
        `
            <div class="card mb-3" id="card-shell">
                <div class="row g-0" id="card-item">
                    <div class="col-md-4" id="card-image">
                        <img src='${bookList[i].cover}' id='${i}' class='bookCover' onload='getImageSize(${i})'/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body" id="card-body">
                            <h5>${bookList[i].title}</h5> 
                            <p>${bookList[i].author}</p> 
                            <p>${bookList[i].date}</p>
                            <p>ISBN: ${bookList[i].isbn}</p>
                            <br>
                            <button id="addBook" onClick=pickBooks(${i})>Add book</button>
                        </div>
                    </div>
                </div>
            </div>    
        `
    }
}
function pickBooks(addedBook) {
    console.dir(bookList[addedBook])
    addBook(bookList[addedBook])
}

let badImage
function getImageSize(index) { // returns image height as validation
    imageHeight = document.getElementsByTagName('img')[index].height
    if (imageHeight <= 1) {
        console.log(`bad image at ${index}`)
        function changeImage() {
            badImage = document.getElementById(index)
            console.log(badImage.src)
            badImage.src = defaultCover
            bookList[index].cover = defaultCover
        }
        changeImage(index)
    }
    return document.getElementsByTagName('img')[index].height
}
function clear() {
    let book
    let bookResult = []
    let bookCover = []
    let bookCoverRequest = []
    document.getElementById('card').innerHTML = ''
}

