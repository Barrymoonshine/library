const libraryContainer = document.getElementById('library-container');
const modal = document.getElementById('new-book-modal');
const modalButton = document.getElementById('modal-button');
const closeButton = document.getElementsByClassName('close')[0];
const newBookForm = document.getElementById('new-book-form');
const body = document.getElementById('body');
const myLibrary = [];

// Modal event listeners
modalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  body.style.backgroundColor = 'rgba (0,0,0,0.4)';
});
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

newBookForm.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();
  addBookToLibrary();
  displayLibrary();
  resetForm();
}

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function removeDivs() {
  while (libraryContainer.lastElementChild) {
    libraryContainer.removeChild(libraryContainer.lastElementChild);
  }
}

function hideModal() {
  modal.style.display = 'none';
}

function removeButtonEventListener(removeBookButton) {
  removeBookButton.addEventListener('click', (e) => {
    // Removes targeted book
    const element = document.getElementById(e.target.id);
    const index = element.id;
    myLibrary.splice(index, 1);
    displayLibrary();
  });
}

function haveReadButtonEventListener(haveReadButton) {
  haveReadButton.addEventListener('click', (e) => {
    // Changes have read status of targeted book
    const haveReadButtonValue = document.getElementById(e.target.id).textContent;
    const myLibraryArrayIndex = e.target.id.replace('haveRead', '');
    if (haveReadButtonValue == 'Read') {
      haveReadButton.style.backgroundColor = '#f87171';
      haveReadButton.innerText = 'Not read';
      myLibrary[myLibraryArrayIndex].haveRead = false;
    } else if (haveReadButtonValue == 'Not read') {
      haveReadButton.style.backgroundColor = '#4ade80';
      haveReadButton.innerText = 'Read';
      myLibrary[myLibraryArrayIndex].haveRead = true;
    }
  });
}

function createLibraryCard() {
  myLibrary.forEach((item, index) => {
    // Create elements to append onto the library card
    const libraryBook = document.createElement('div');
    const removeBookButton = document.createElement('button');
    const haveReadButton = document.createElement('button');
    libraryBook.className = 'my-library-cards';
    libraryBook.id = index;
    removeBookButton.id = index;
    haveReadButton.id = `haveRead${index}`;

    // Create content for the elements
    libraryBook.innerText = `Title: ${item.title} \n 
    Author: ${item.author} \n
    Number of pages: ${item.pages}`;
    removeBookButton.innerText = 'Remove book';
    if (item.haveRead === true) {
      haveReadButton.style.backgroundColor = '#4ade80';
      haveReadButton.innerText = 'Read';
    } else if (item.haveRead === false) {
      haveReadButton.style.backgroundColor = '#f87171';
      haveReadButton.innerText = 'Not read';
    }

    // Append elements
    libraryBook.append(haveReadButton, removeBookButton);
    libraryContainer.appendChild(libraryBook);

    // Add event listeners
    removeButtonEventListener(removeBookButton);
    haveReadButtonEventListener(haveReadButton);
  });
}

function displayLibrary() {
  removeDivs();
  hideModal();
  createLibraryCard();
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('have-read').checked = null;
}

// Function called when form submitted
function addBookToLibrary() {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const haveReadValue = document.getElementById('have-read').checked;
  const newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
  myLibrary.push(newBook);
}
