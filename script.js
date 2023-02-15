const libraryContainer = document.getElementById('libraryContainer');
const modal = document.getElementById('newBookModal');
const modalButton = document.getElementById('modalButton');
const span = document.getElementsByClassName('close')[0];
const body = document.getElementById('body');
const myLibrary = [];

// Modal event listeners
modalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  body.style.backgroundColor = 'rgba (0,0,0,0.4)';
});
span.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

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
    const element = document.getElementById(e.target.id);
    element.remove();
    delete myLibrary[e.target.id];
  });
}

function haveReadButtonEventListener(haveReadButton) {
  haveReadButton.addEventListener('click', (e) => {
    const haveReadButtonValue = document.getElementById(e.target.id).textContent;
    const myLibraryArrayIndex = e.target.id.replace('haveRead', '');
    if (haveReadButtonValue == 'Read') {
      haveReadButton.style.backgroundColor = 'rgb(214, 27, 27)';
      haveReadButton.innerText = 'Not read';
      myLibrary[myLibraryArrayIndex].haveRead = false;
    } else if (haveReadButtonValue == 'Not read') {
      haveReadButton.style.backgroundColor = 'rgb(134, 228, 134)';
      haveReadButton.innerText = 'Read';
      myLibrary[myLibraryArrayIndex].haveRead = true;
    }
  });
}

function createLibraryCard() {
  myLibrary.forEach((item, index) => {
    // Create elements to append onto the library card
    const libraryBook = document.createElement('div');
    const libraryBookTitle = document.createElement('div');
    const libraryBookAuthor = document.createElement('div');
    const libraryBookPages = document.createElement('div');
    const removeBookButton = document.createElement('button');
    const haveReadButton = document.createElement('button');
    libraryBook.className = 'myLibraryCards';
    libraryBook.id = index;
    removeBookButton.id = index;
    haveReadButton.id = `haveRead${index}`;

    // Create content for the elements
    const libraryBookValue = item;
    libraryBookTitle.innerText = `Title: ${libraryBookValue.title}`;
    libraryBookAuthor.innerText = `Author: ${libraryBookValue.author}`;
    libraryBookPages.innerText = `Number of pages: ${libraryBookValue.pages}`;
    removeBookButton.innerText = 'Remove book';
    if (libraryBookValue.haveRead == true) {
      haveReadButton.style.backgroundColor = 'rgb(134, 228, 134';
      haveReadButton.innerText = 'Read';
    } else if (libraryBookValue.haveRead == false) {
      haveReadButton.style.backgroundColor = 'rgb(214, 27, 27)';
      haveReadButton.innerText = 'Not read';
    }

    // Append elements
    libraryBook.append(libraryBookTitle, libraryBookAuthor, libraryBookPages);
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
  document.getElementById('haveRead').checked = null;
}

// Function called when form submitted
function addBookToLibrary(event) {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const haveReadValue = document.getElementById('haveRead').checked;
  const newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
  myLibrary.push(newBook);
  displayLibrary();
  resetForm();
  event.preventDefault();
}
