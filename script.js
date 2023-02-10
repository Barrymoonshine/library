const libraryContainer = document.getElementById('libraryContainer');
const modal = document.getElementById('newBookModal');
const modalButton = document.getElementById('modalButton');
const span = document.getElementsByClassName("close")[0];
const submitButton = document.getElementById('submitButton');
const body = document.getElementById('body');
let myLibrary = [];

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

    // Create elements to be appended onto the library cards 
    let libraryBook = document.createElement('div');
    let libraryBookTitle = document.createElement('div');
    let libraryBookAuthor = document.createElement('div');
    let libraryBookPages = document.createElement('div');
    let removeBookButton = document.createElement('button');
    let haveReadButton = document.createElement('button');
    libraryBook.className = 'myLibraryCards';
    libraryBook.id = index;
    libraryBookValue = item;
    removeBookButton.id = index;
    haveReadButton.id = `haveRead${index}`;

    // Set the content of the elements 
    libraryBookTitle.innerText = "Title: " +libraryBookValue.title;
    libraryBookAuthor.innerText = "Author: " +libraryBookValue.author;
    libraryBookPages.innerText = "Number of pages: " +libraryBookValue.pages;
    removeBookButton.innerText = "Remove book"
    if (libraryBookValue.haveRead == true) {
      haveReadButton.style.backgroundColor = 'rgb(134, 228, 134';
      haveReadButton.innerText = 'Read';
    } else if (libraryBookValue.haveRead == false) {
      haveReadButton.style.backgroundColor = 'red';
      haveReadButton.innerText = 'Not read';
    }

    // Append elements 
    libraryBook.append(libraryBookTitle,libraryBookAuthor,libraryBookPages,haveReadButton, removeBookButton);
    libraryContainer.appendChild(libraryBook);

    //Add event listeners 
    removeButtonEventListener(removeBookButton);
    haveReadButtonEventListener(haveReadButton);  
})
}

function removeButtonEventListener (removeBookButton) {
  removeBookButton.addEventListener("click", (e) => {
    const element = document.getElementById(e.target.id)
    element.remove();
    delete myLibrary[e.target.id];
  }) ;
}

function haveReadButtonEventListener (haveReadButton) {
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