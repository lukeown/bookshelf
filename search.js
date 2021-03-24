// ---== TO DO ==---
//
// [DONE] USER AUTHENTICATION VIA FIREBASE
// [] PERSONAL BOOKSHELVES
// [] PERSONAL READING STATS
// [] ABOUT PAGE
// [] IMAGE PROBLEM (PLACEHOLDER)
// [] SPEED UP XHR REQUEST?



// App needs to let users:
// - search books
// - view book results returned from the search
// - add books to their own bookshelf -- figure out how to return books first
// ---- books will be saved to personal bookshelves (firebase users)

// Search 
// - user submits input form
// - event listener sees submission and calls the fetchBooks function
// - fetchBooks function searches the openbooks API using the value of the input field
// - response of the API search is returned and console logged
// - returned response is plugged into the DOM using Object Oriented Programming

// This took forever to get to work and I'll try to explain what I've learned below:
// DOM references such as the getElementById references have to be in the scope they're being used for
// to prevent the page from refreshing on form submission - event.preventDefault()
// The searchBooks function call just starts the process of getting book results. Don't define any parameters or arguments in it
// I was getting a lot of 'response.json() is not a function' errors and I don't know what I did to fix it



async function searchBooks() {
    event.preventDefault()
    
    let bookResult = [] // clears out bookResults on every function call

    let userInput = document.getElementById('input').value

    document.getElementById('searchConfirm').innerHTML = `Searching for: ${userInput}. <br> If response takes more than 5 seconds, please see about page for help.`

    const response =  await fetch(`https://openlibrary.org/search.json?q=${userInput}`)

    let book = await response.json()

    console.log(book)
    //BOOK COVER API REQUEST
    //WORKS RIGHT NOW BUT A LOT OF BOOKS DON'T HAVE COVERS
    //loop over?
    //need to check if the book has a cover file, if not display a placeholder. If it does, show the cover.

    let bookCoverRequest = await (fetch(`https://covers.openlibrary.org/b/isbn/${book.docs[4].isbn[0]}-M.jpg`)) 
    console.log(bookCoverRequest.url)
    
    for (i = 0; i < book.length; i++) {
        console.log(bookCoverRequest.url)
    }

    let bookCover = bookCoverRequest.url
    console.dir(bookCover)
    console.log(book.numFound)
    for (let i = 0; i <= 3; i++) { // pushes the first 5 search results to the bookResult array
        bookResult.push({cover: bookCover, title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})
    }
    
    document.getElementById('searchConfirm').innerHTML = `Showing results for: ${userInput}`

    console.log(bookResult)
    generateCard(bookResult)

}

//generateCard takes the books array and throws the information to render into the 'card' div
//also creates an img element within the 'card' div, using the url stored bookResult.cover, which is then passed into the generateCard function as bookList.cover

function generateCard(bookList) { 
  for (let i = 0; i < bookList.length; i++) { 
    //for every book, make a card and fill in the info
    document.getElementById('card').innerHTML += // fill in card structure and content
        `
            <div class="card mb-3" id="card-shell" style="max-width: 600px;">
                <div class="row g-0" id="card-item">
                    <div class="col-md-4" id="card-image">
                        <img src='${bookList[i].cover}' />
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
            </div>
        `

   
} 
}

//current issues with site
//some books have dates that aren't eligble (not 4 digits) - instead of relying on first_publish_year, find the lowest eligible value in the publish_year array
//some books don't have book cover - fix by setting placeholder image and using that if there is no eligible image