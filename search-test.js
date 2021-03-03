const userInput = prompt("Please enter a book title", "Lord of the Rings");
if (userInput != null) {
    alert(`Searching for "${userInput}".`);
    fetchBooks(userInput);
}

const book = '';
const books = [];
const bookList = [books];
const bookResult = '';
const read = true;
async function fetchBooks() {
    const response = await fetch(`http://openlibrary.org/search.json?title=${userInput}`);
    let book = await response.json();
    console.log(book)
    let bookResult = book.docs[0]
    const author = bookResult.author_name[0]
    
    //need to figure out how to put the data from this book result into an array
    books.push({title: bookResult.title, author: author, isbn: bookResult.isbn[0], date: bookResult.first_publish_year})
    // generateArray(bookResult.title)
    console.log(books)
    generateCard(books)
}


function generateCard(bookList) { //generateCard takes the books array and throws the information into the 'card' div
    console.log(bookList)
  for (var i = 0; i < bookList.length; i++) {
    document.getElementById('card').innerHTML += `${bookList[i].title}, ${bookList[i].author}, ${bookList[i].date} -- ISBN: ${bookList[i].isbn}`
} 
}

// To make this show more than one result, I think I just need to loop over the results for the first 5, then display them the same way that I have been
// The issue comes with the fetch function - bookResult only collects the data from the 0th index of book.docs





// function generateArray(data) { //generateArray puts the data from the fetch request into the books array, then calls the generateCard function for the array
//     console.log(data)
//     let books = []
//         for ( let i = 0; i < data.length; i++) {
//             let selectedData = data[i]
//             const book = {title: selectedData["title"], author:selectedData["author_name"], firstEdition:selectedData["first_publish_year"]};
//             books.push(book)
//         }
//         generateCard(books)
//     }
    
// function generateCard(bookList) { //generateCard takes the books array and throws the information into the 'card' div
//     console.log(bookList)
//     for (var i = 0; i < bookList.length; i++) {
//         console.log(i)
//         console.log(bookList[i].title)
//         document.getElementById('card').innerHTML += " "  + bookList[i].title + ',' // populates the 'card' div with titles from the bookList array
//     } 
// }