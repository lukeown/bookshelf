const userInput = prompt("Please enter a book title", "Lord of the Rings");
if (userInput != null) {
    alert(`Searching for "${userInput}".`);
    fetchBooks(userInput);
}

const book = '';
const books = [];
async function fetchBooks() {
    const response = await fetch(`http://openlibrary.org/search.json?q=${userInput}`);
    let book = await response.json();
    const bookResult = book.docs[0]
    console.dir(bookResult.title)
    console.log(book.docs[0])
    console.log(book.docs[0].title)
    //need to figure out how to put the data from this book result into an array
    books.push([bookResult.title], bookResult.author_name)
    // generateArray(bookResult.title)
    console.log(books)
}

// function generateArray() {
//     for ( let i = 0; i < book; i++) {
//         // const book = { title: [title], author: [author] };
//         books.push(bookResult)
//     }
//     console.log(books)
// }







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