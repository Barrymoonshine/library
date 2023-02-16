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
  myLibrary.forEach((item, index) => {
    // Create elements to append onto the library container
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
  });
}

libraryContainer.addEventListener('click', (e) => {
  if (String(e.target.id).match(/^[0-9]+$/) != null) {
    deleteBook(e);
  } else {
    updateReadStatus(e);
  }
});

function deleteBook(e) {
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
