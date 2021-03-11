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
    let userInput = document.getElementById('input').value
    const response =  await fetch(`http://openlibrary.org/search.json?q=${userInput}`)
    let book = await response.json()

    let bookResult = []
    for (let i = 0; i < 5; i++) { // pushes the first 5 search results to the bookResult array
        bookResult.push({title: book.docs[i].title, author: book.docs[i].author_name, date: book.docs[i].first_publish_year, isbn: book.docs[i].isbn[0]})
    }

    console.log(bookResult)
    generateCard(bookResult)

}

function generateCard(bookList) { //generateCard takes the books array and throws the information into the 'card' div
  for (let i = 0; i < bookList.length; i++) {
    document.getElementById('card').innerHTML += `${bookList[i].title}, ${bookList[i].author}, ${bookList[i].date} -- ISBN: ${bookList[i].isbn}<br>`
} 
}
