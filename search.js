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
// [] SPEED UP FETCH REQUEST?



// App needs to let users:
// - search books
// - view book results returned from the search
// - add books to their own bookshelf -- figure out how to return books first
// ---- books will be saved to personal bookshelves (firebase user authentication)

// Search 
// - user submits input form
// - event listener sees submission and calls the fetchBooks function
// - fetchBooks function searches the openbooks API using the value of the input field
// - response of the API search is returned
// - returned response is plugged into the DOM


async function searchBooks() {
    event.preventDefault()
    
    let bookResult = [] // clears out bookResults on every function call
    let userInput = document.getElementById('input').value;
    document.getElementById('searchConfirm').innerHTML = `Searching for: ${userInput}. <br> Books will take a few seconds to load (uses third party API) <br> If response takes more than 5 seconds, please refresh and retry search.`
    const response =  await fetch(`https://openlibrary.org/search.json?title=${userInput}`)
    let book = await response.json()
    console.log(book)

    //BOOK COVER API REQUEST
    //WORKS RIGHT NOW BUT A LOT OF BOOKS DON'T HAVE COVERS
    //need to check if the book has a cover file, if not display a placeholder.

    let bookCoverRequest = []
    let bookCover= []
    for (let i=0; i<5; i++) {
        bookCoverRequest = await fetch(`https://covers.openlibrary.org/b/isbn/${book.docs[i].isbn[0]}-M.jpg`);
        bookCover.push(bookCoverRequest.url)
    }

    for (let i = 0; i < 5; i++) { // Pushes the first 5 search results to the bookResult array
        bookResult.push({cover: bookCover[i], title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})
    }
    document.getElementById('searchConfirm').innerHTML = `Showing results for: ${userInput}`
    generateCard(bookResult)
}

// generateCard function takes the books array and throws the information to render into the card div
// also creates an img element within the 'card' div, using the url stored bookResult.cover, which is then passed into the generateCard function as bookList.cover
// then checks that the book cover image is valid (over 1x1px) - if not, replaces with a placeholder (defaultCover)
const defaultCover = 'https://www.claws.in/static/book-cover-placeholder-e1563706855534.jpg'

function generateCard(bookList) { 
    for (let i = 0; i < bookList.length; i++) { 
    //for every book, make a card and fill in the info
        document.getElementById('card').innerHTML += // fill in card structure and content
        `
            <div class="card mb-3" id="card-shell" style="max-width: 600px;">
                <div class="row g-0" id="card-item">
                    <div class="col-md-4" id="card-image">
                        <img src='${bookList[i].cover}' onload='getImageSize(${i})'/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body" id="card-body">
                            <h5>${bookList[i].title}</h5> 
                            <p>${bookList[i].author}</p> 
                            <p>${bookList[i].date}</p>
                            <p>ISBN: ${bookList[i].isbn}</p>
                            <br>
                        </div>
                    </div>
                </div>
            </div>    `
    }
}

function getImageSize(index) { // returns image height
    console.log(document.getElementsByTagName('img')[index].height)
    return document.getElementsByTagName('img')[index].height
}

//current issues with site
//some books have dates that aren't eligble (not 4 digits) - instead of relying on first_publish_year, find the lowest eligible value in the publish_year array
//some books don't have book cover - fix by setting placeholder image and using that if selected image isn't valid