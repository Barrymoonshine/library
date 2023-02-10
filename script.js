const libraryContainer = document.getElementById('libraryContainer');
const modal = document.getElementById('newBookModal');
const modalButton = document.getElementById('modalButton');
const span = document.getElementsByClassName("close")[0];
const submitButton = document.getElementById('submitButton');
const body = document.getElementById('body');
let myLibrary = [];

// submitButton.addEventListener("click", (event) => {
//   addBookToLibrary();
//   event.preventDefault();
// });
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

function addBookToLibrary(event) {
  getFormValues();
  let newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
  myLibrary.push(newBook);
  displayLibrary();
  resetForm();
  event.preventDefault();
}

function getFormValues(){
  titleValue = document.getElementById('title').value;
  authorValue = document.getElementById('author').value;
  pagesValue = document.getElementById('pages').value;
  haveReadValue = document.getElementById('haveRead').checked;
}

function displayLibrary () {
  removeDivs();
  hideModal();
  createLibraryCard();
}

function createLibraryCard () {
  myLibrary.forEach(function (item, index) {
    let libraryBook = document.createElement('div');
    let removeBookButton = document.createElement('button');
    let haveReadButton = document.createElement('button');
    let libraryBookTitle = document.createElement('div');
    let libraryBookAuthor = document.createElement('div');
    let libraryBookPages = document.createElement('div');
    libraryBook.className = 'myLibraryCards';
    libraryBook.id = index;
    libraryBookValue = item;
    removeBookButton.innerText = "Remove book"
    removeBookButton.id = index;
    haveReadButton.id = `haveRead${index}`;
    libraryBookTitle.innerText = "Title: " +libraryBookValue.title;
    libraryBookAuthor.innerText = "Author: " +libraryBookValue.author;
    libraryBookPages.innerText = "Number of pages: " +libraryBookValue.pages;
    if (libraryBookValue.haveRead == true) {
      haveReadButton.style.backgroundColor = 'rgb(134, 228, 134';
      haveReadButton.innerText = 'Read';
    } else if (libraryBookValue.haveRead == false) {
      haveReadButton.style.backgroundColor = 'red';
      haveReadButton.innerText = 'Not read';
    }
    libraryContainer.appendChild(libraryBook);
    libraryBook.append(libraryBookTitle,libraryBookAuthor,libraryBookPages,haveReadButton, removeBookButton);
    removeBookButton.addEventListener("click", (e) => {
      const element = document.getElementById(e.target.id)
      element.remove();
      delete myLibrary[e.target.id];
    }) ;
    haveReadButton.addEventListener("click", (e) => {
      const haveReadButtonValue = document.getElementById(e.target.id).textContent;
      let myLibraryArrayIndex = e.target.id.replace('haveRead','');
      if (haveReadButtonValue == 'Read') {
        haveReadButton.style.backgroundColor = 'red';
        haveReadButton.innerText = 'Not read';
        myLibrary[myLibraryArrayIndex].haveRead = false;
      } else if (haveReadButtonValue == 'Not read') {
        haveReadButton.style.backgroundColor = 'rgb(134, 228, 134';
      haveReadButton.innerText = 'Read';
      myLibrary[myLibraryArrayIndex].haveRead = true;
      }
  });
})
}

function resetForm () {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('haveRead').checked = null;
}

function removeDivs() {
  while (libraryContainer.lastElementChild) {
    libraryContainer.removeChild(libraryContainer.lastElementChild);
  }
}

function hideModal () {
  modal.style.display = "none";
}