const userInput = prompt("Please enter a book title", "Lord of the Rings");
if (userInput != null) {
    alert(`Searching for "${userInput}".`);
    fetchBooks(userInput);
}


async function fetchBooks() {
    const response = await fetch(`http://openlibrary.org/search.json?q=${userInput}`);
    const books = await response.json();
    console.dir(books.docs[0])

}
fetchBooks().then(books => {
    books;
})






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