# Bookshelf

## A tool that allows you to keep track of which books you’ve read.

Bookshelf is designed to be a search tool and book tracker. Users can search the Open Library books database and add books to their personal shelf. Users information is stored using Firebases's User Authentication, making it possible for users to keep track of their favorite books.

### How to use:

- Start on the landing page. You can choose to sign, register, or continue to the search tool anonymously. 
- On the search page, you can lookup book titles and receive results from the openLibrary openBooks API. Every listing has a title, publish date, isbn, and cover image. You can select books from these results to add to your personal bookshelf. 
- On the My Shelf page, you can view your personalized book collection.

Features I used:
- Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX)
  - Fetch request to openBooks API
- Post to an external API and show that it has saved/persisted
  - Post to Firebase UserAuth and Firestore
- Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application
  - Book search and bookshelf displays

To get started using this tool, go to https://lukeown.github.io/bookshelf/sign-in.html
