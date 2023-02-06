const libraryContainer = document.getElementById('libraryContainer');

document.getElementById('submitButton').addEventListener("click", (e) => {
  addBookToLibrary();
});

let myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    return`${title} ${author} ${pages} ${haveRead}`;
  };
}

function addBookToLibrary() {
  getFormValues();
  let newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
  myLibrary.push(newBook);
  displayLibrary();
  resetForm();
}

function getFormValues(){
  titleValue = document.getElementById('title').value;
  authorValue = document.getElementById('author').value;
  pagesValue = document.getElementById('pages').value;
  haveReadValue = document.getElementById('haveRead').value;
}

function displayLibrary () {
  removeDivs();
  myLibrary.forEach(function (item) {
    let libraryBook = document.createElement('div');
    libraryBook.className = 'myLibraryCards';
    libraryBookValue = item.info();
    libraryBook.innerText = libraryBookValue
    libraryBook.style.backgroundColor = "grey";
    libraryContainer.appendChild(libraryBook);
  });
}

function resetForm () {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('haveRead').checked = false;
}

function removeDivs() {
  while (libraryContainer.lastElementChild) {
    libraryContainer.removeChild(libraryContainer.lastElementChild);
  }
}