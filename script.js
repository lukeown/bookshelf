// const books = [];

// class Book {
//     constructor(title, work, picture ) {
//       this.title = title;
//       this.work = work;
//       this.picture = picture;
//     } 
//   }




  



fetch('https://openlibrary.org/people/mompea/lists/OL116325L/seeds.json') // fetch request returns a response in json format
    .then(response => response.json()) 
    .then(data => generateArray(data.entries)) // data is then used in the generateArray function to populate an array
    

function generateArray(data) { //generateArray puts the data from the fetch request into the books array, then calls the generateCard function for the array
  let books = []
    for ( let i = 0; i < data.length; i++) {
        let selectedData = data[i]
        const book = {title: selectedData["title"], count:selectedData["work_count"], picture:selectedData["picture"]};
        books.push(book)
    }
    generateCard(books)
}
  
function generateCard(bookList) { //generateCard takes the books array and throws the information into the 'card' div
  console.log(bookList)
  for (var i = 0; i < bookList.length; i++) {
    console.log(i)
    console.log(bookList[i].title)
    document.getElementById('card').innerHTML += " "  + bookList[i].title // populates the 'card' div with titles from the bookList array
  } 
}
