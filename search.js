// App needs to let users:
// - search books
// - view book results returned from the search
// - add books to their own bookshelf -- figure out how to return books first

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
    document.getElementById('card').innerHTML = '' //clears out the card div for every search

    let userInput = document.getElementById('input').value
    const response =  await fetch(`http://openlibrary.org/search.json?q=${userInput}`)

    let book = await response.json()

    //BOOK COVER API REQUEST
    //WORKS RIGHT NOW BUT A LOT OF BOOKS DON'T HAVE COVERS
    //loop over?
    //need to check if the book has a cover file, if not display a placeholder. If it does, show the cover.

    let bookCoverRequest = await (fetch(`http://covers.openlibrary.org/b/isbn/${book.docs[3].isbn[0]}-M.jpg`)) 
    console.log(bookCoverRequest.url)
    
    for (i = 0; i < 5; i++) {
        console.log(bookCoverRequest.url)
    }

    let bookCover = bookCoverRequest.url
    console.dir(bookCover)
    for (let i = 0; i < 5; i++) { // pushes the first 5 search results to the bookResult array
        bookResult.push({cover: bookCover, title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})
    }

    console.log(bookResult)
    generateCard(bookResult)

}

//generateCard takes the books array and throws the information into the 'card' div
//also creates an img element within the 'card' div, using the url stored bookResult.cover, which is then passed into the generateCard function as bookList.cover

function generateCard(bookList) { 
  for (let i = 0; i < bookList.length; i++) {
    document.getElementById('card').innerHTML += `<img src='${bookList[i].cover}' /> ${bookList[i].title}, ${bookList[i].author}, ${bookList[i].date} -- ISBN: ${bookList[i].isbn}<br>`
} 
}
