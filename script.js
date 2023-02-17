const libraryContainer = document.getElementById('library-container');
const modal = document.getElementById('new-book-modal');
const modalButton = document.getElementById('modal-button');
const closeModalButton = document.getElementsByClassName('close')[0];
const newBookForm = document.getElementById('new-book-form');
const body = document.getElementById('body');
const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

newBookForm.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();
  addBookToLibrary();
  displayLibrary();
  resetForm();
}

function addBookToLibrary() {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const haveReadValue = document.getElementById('have-read').checked;
  const newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
  myLibrary.push(newBook);
}

function displayLibrary() {
  removeDivs();
  hideModal();
  createLibraryCard();
  styleHaveReadButton();
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('have-read').checked = false;
}

function removeDivs() {
  while (libraryContainer.lastElementChild) {
    libraryContainer.removeChild(libraryContainer.lastElementChild);
  }
}

function hideModal() {
  modal.style.display = 'none';
}

function createLibraryCard() {
  // Creates library card content
  myLibrary.forEach((item, index) => {
    libraryContainer.innerHTML += String.raw`
    <div class='my-library-cards' id='${index}'>
      <div>
        <p>Title: ${item.title}</p> <br>
        <p>Author: ${item.author}</p> <br>
        <p>Number of pages: ${item.pages}</p> 
      </div>
      <button id='haveRead${index}'>${item.haveRead}</button>
      <button id='${index}'>Remove book</button>
    </div>`;
  });
}

function styleHaveReadButton() {
  myLibrary.forEach((item, index) => {
    const haveReadButton = document.getElementById(`haveRead${index}`);
    if (item.haveRead === true) {
      haveReadButton.style.backgroundColor = '#4ade80';
      haveReadButton.innerText = 'Read';
    } else if (item.haveRead === false) {
      haveReadButton.style.backgroundColor = '#f87171';
      haveReadButton.innerText = 'Not read';
    }
  });
}

libraryContainer.addEventListener('click', (e) => {
  // Checks if the target id only contains numbers and is therefore the delete button
  if (String(e.target.id).match(/^[0-9]+$/) != null) {
    deleteBook(e);
    // Else the user has selected the read status button
  } else {
    updateReadStatus(e);
  }
});

function deleteBook(e) {
  // Deletes the selected book from the array and returns a new array
  const element = document.getElementById(e.target.id);
  const index = element.id;
  myLibrary.splice(index, 1);
  displayLibrary();
}

function updateReadStatus(e) {
  const haveReadButton = document.getElementById(e.target.id);
  const myLibraryArrayIndex = e.target.id.replace('haveRead', '');
  if (haveReadButton.textContent === 'Read') {
    haveReadButton.style.backgroundColor = '#f87171';
    haveReadButton.innerText = 'Not read';
    myLibrary[myLibraryArrayIndex].haveRead = false;
  } else if (haveReadButton.textContent === 'Not read') {
    haveReadButton.style.backgroundColor = '#4ade80';
    haveReadButton.innerText = 'Read';
    myLibrary[myLibraryArrayIndex].haveRead = true;
  }
}

// Modal event listeners
modalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  body.style.backgroundColor = 'rgba (0,0,0,0.4)';
});
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
