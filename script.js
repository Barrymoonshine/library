const libraryContainer = document.getElementById('libraryContainer');
const modal = document.getElementById('newBookModal');
const modalButton = document.getElementById('modalButton');
const span = document.getElementsByClassName("close")[0];
const submitButton = document.getElementById('submitButton');
const body = document.getElementById('body');
let myLibrary = [];

submitButton.addEventListener("click", () => {
  addBookToLibrary();
});
modalButton.addEventListener("click", () => {
  modal.style.display ="block";
  body.style.backgroundColor = "rgba (0,0,0,0.4)";
  
});
span.addEventListener("click", () => {
  modal.style.display = "none";
});



function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    return [title, author, pages, haveRead];
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
  haveReadValue = document.getElementById('haveRead').checked;
}

function displayLibrary () {
  removeDivs();
  removeModal();
  myLibrary.forEach(function (item, index) {
    let libraryBook = document.createElement('div');
    let removeBook = document.createElement('button');
    let libraryBookTitle = document.createElement('div');
    let libraryBookAuthor = document.createElement('div');
    let libraryBookPages = document.createElement('div');
    let libraryBookHaveRead = document.createElement('div');
    libraryBook.className = 'myLibraryCards';
    libraryBook.id = index;
    libraryBookValue = item.info();
    removeBook.innerText = "Remove book"
    removeBook.id = index;
    libraryBookTitle.innerText = "Title: " +libraryBookValue[0]
    libraryBookAuthor.innerText = "Author: " +libraryBookValue[1]
    libraryBookPages.innerText = "Number of pages: " +libraryBookValue[2]
    libraryBookHaveRead.innerText = "Read: " +libraryBookValue[3]
    libraryBook.style.backgroundColor = "grey";
    libraryContainer.appendChild(libraryBook);
    libraryBook.append(libraryBookTitle,libraryBookAuthor,libraryBookPages,libraryBookHaveRead, removeBook);
    removeBook.addEventListener("click", (e) => {
      const element = document.getElementById(e.target.id)
      element.remove();
      delete myLibrary[e.target.id];
    })
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

function removeModal () {
  modal.style.display = "none";
}