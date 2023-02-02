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

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'Not read yet');

book1.info();

function addBookToLibrary() {

}
