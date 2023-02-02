const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    return `${title} ${author} ${pages} ${haveRead}`;
  };
}

// call function using new keyword

const bookOne = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'Read');

const bookTwo = new Book('Moby Dick', 'Herman Melville', '544 pages', 'Not yet read');

const bookThree = new Book('War and Peace', 'Leo Tolstoy', '1296 pages', 'Not yet read');

bookOne.info();
bookTwo.info();
bookThree.info();

function addBookToLibrary() {
  myLibrary.map();
}
