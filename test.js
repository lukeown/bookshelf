// const books = [];

// class Book {
//     constructor(title, work, picture ) {
//       this.title = title;
//       this.work = work;
//       this.picture = picture;
//     } 
//   }

// fetch('https://openlibrary.org/people/mompea/lists/OL116325L/seeds.json')
//     .then(response => response.json())
//     .then(data => generateArray(data.entries))
    



// function generateArray(data) {
//     for ( let i = 0; i < data.length; i++) {
//         let selectedData = data[i]
//         const book = new Book(selectedData["title"], selectedData["work_count"], selectedData["picture"])
//         books.push({book})
//     }
//     generateCard(books)
// }


// function generateCard(bookList) {
//   console.log(bookList)
//   for (var i = 0; i < bookList.length; i++) {
//     console.log(i)
//     console.log(bookList[i].title)
//     document.getElementById('card').innerHTML = bookList[i].title // returning [object Object]
//   } 
// }


  



fetch('https://openlibrary.org/people/mompea/lists/OL116325L/seeds.json')
    .then(response => response.json())
    .then(data => generateArray(data.entries))
    

function generateArray(data) {
  let books = []
    for ( let i = 0; i < data.length; i++) {
        let selectedData = data[i]
        const book = {title: selectedData["title"], count:selectedData["work_count"], picture:selectedData["picture"]};
        books.push(book)
    }
    generateCard(books)
}
  
function generateCard(bookList) {
  console.log(bookList)
  for (var i = 0; i < bookList.length; i++) {
    console.log(i)
    console.log(bookList[i].title)
    document.getElementById('card').innerHTML = document.getElementById('card').innerHTML +  " "  + bookList[i].title // returning [object Object]
  } 
}

// function generateCover(data) {
//     const html = `
//     <h1>${data}`
//     ;
//     card.innerHTML = html;
// }

// ORIGINAL

// function generateArray(data) {
//     const classics = [];
//     for (var i = 0; i < data.length; i++) {
//         classics.push(data[i])
//         console.log(classics[i])
//     }
// }