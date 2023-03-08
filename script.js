const libraryContainer = document.getElementById('library-container');
const modal = document.getElementById('new-book-modal');
const modalButton = document.getElementById('modal-button');
const closeModalButton = document.getElementsByClassName('close')[0];
const newBookForm = document.getElementById('new-book-form');
const body = document.getElementById('body');

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

class LibraryController {
  constructor(element) {
    this.libraryContainer = element;
    this.myLibrary = [
      {
        title: 'The Hobbit',
        author: 'J R R Tolkien',
        pages: '300',
        haveRead: true,
      },
    ];
  }

  createLibrary() {
    // Removes all previous books and adds all previous books plus new book
    while (this.libraryContainer.firstChild) {
      this.libraryContainer.removeChild(this.libraryContainer.firstChild);
    }

    this.myLibrary.forEach((item, index) => {
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

  styleHaveReadButton() {
    this.myLibrary.forEach((item, index) => {
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

  addNewBook() {
    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pagesValue = document.getElementById('pages').value;
    const haveReadValue = document.getElementById('have-read').checked;
    const newBook = new Book(
      titleValue,
      authorValue,
      pagesValue,
      haveReadValue
    );
    this.myLibrary.push(newBook);
  }

  resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('have-read').checked = false;
  }
}

const library = new LibraryController(libraryContainer);

library.createLibrary();

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

newBookForm.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();
  library.addNewBook();
  library.createLibrary();
  library.styleHaveReadButton();
  library.resetForm();
}

// Moved to Library Controller
// function addBookToLibrary() {
//   const titleValue = document.getElementById('title').value;
//   const authorValue = document.getElementById('author').value;
//   const pagesValue = document.getElementById('pages').value;
//   const haveReadValue = document.getElementById('have-read').checked;
//   const newBook = new Book(titleValue, authorValue, pagesValue, haveReadValue);
//   myLibrary.push(newBook);
// }

// No longer needed as handled by Library Controller
// function displayLibrary() {
//   removeDivs();
//   hideModal();
//   createLibraryCard();
//   styleHaveReadButton();
// }

// Moved to Library Controller
// function resetForm() {
//   document.getElementById('title').value = '';
//   document.getElementById('author').value = '';
//   document.getElementById('pages').value = '';
//   document.getElementById('have-read').checked = false;
// }

// Moved to Library Controller
// function removeDivs() {
//   while (libraryContainer.lastElementChild) {
//     libraryContainer.removeChild(libraryContainer.lastElementChild);
//   }
// }

// No longer needed
// function hideModal() {
//   modal.style.display = 'none';
// }

// Moved to Library Controller
// function createLibraryCard() {
//   // Creates library card content
//   myLibrary.forEach((item, index) => {
//     libraryContainer.innerHTML += String.raw`
//     <div class='my-library-cards' id='${index}'>
//       <div>
//         <p>Title: ${item.title}</p> <br>
//         <p>Author: ${item.author}</p> <br>
//         <p>Number of pages: ${item.pages}</p>
//       </div>
//       <button id='haveRead${index}'>${item.haveRead}</button>
//       <button id='${index}'>Remove book</button>
//     </div>`;
//   });
// }

// Moved to Library Controller
// function styleHaveReadButton() {
//   myLibrary.forEach((item, index) => {
//     const haveReadButton = document.getElementById(`haveRead${index}`);
//     if (item.haveRead === true) {
//       haveReadButton.style.backgroundColor = '#4ade80';
//       haveReadButton.innerText = 'Read';
//     } else if (item.haveRead === false) {
//       haveReadButton.style.backgroundColor = '#f87171';
//       haveReadButton.innerText = 'Not read';
//     }
//   });
// }

libraryContainer.addEventListener('click', (e) => {
  // Checks if the target id only contains numbers and is therefore the delete button
  if (String(e.target.id).match(/^[0-9]+$/) != null) {
    deleteBook(e);
    // Else the user has selected the read status button
  } else {
    myLibrary.getValue();
  }
});

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
