const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use new keyword for construction of object");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function () {
  if (this.read === true) {
    return this.read;
  }
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("The Great Gatsby", "F.Scott Fitzgerald", 180, true);
addBookToLibrary("The Odyssey", "Homer", 592, false);

function displayBooks() {
  const booksContainer = document.querySelector(".books-container");
  booksContainer.innerHTML = "";

  const booksCollection = document.querySelector(".books-number");

  if (!myLibrary.length) {
    booksCollection.textContent = `Number of Books ${myLibrary.length}`;
    document.querySelector(".empty-message").style.display = "block";
  } else {
    booksCollection.textContent = `Number of Books: ${myLibrary.length}`;
    myLibrary.forEach((book) => {
      createCard(book, booksContainer);
    });
  }
}

function createCard(book, booksContainer) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.dataset.bookId = book.id;

  const title = document.createElement("h1");
  title.classList.add("title");

  const author = document.createElement("h2");
  author.classList.add("author");

  const pages = document.createElement("p");
  pages.classList.add("pages");

  const read = document.createElement("div");
  read.classList.add("read-box");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-button");

  title.textContent = book.title;
  author.textContent = `${book.author}'s`;
  pages.textContent = `${book.pages} pages`;

  if (book.readStatus() === true) {
    readOk(read);
  } else {
    readNotOk(read);
  }

  read.addEventListener("click", () => {
    read.style.backgroundColor === "red" ? readOk(read) : readNotOk(read);
  });

  deleteBtn.textContent = "remove";

  deleteBtn.addEventListener("click", () => {
    const idToDelete = card.dataset.bookId;
    const bookIndex = myLibrary.findIndex((b) => b.id === idToDelete);
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  });

  card.appendChild(author);
  card.appendChild(title);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(deleteBtn);
  booksContainer.appendChild(card);
}

function readOk(read) {
  read.style.backgroundColor = "green";
  read.textContent = "read";
}

function readNotOk(read) {
  read.style.backgroundColor = "red";
  read.textContent = "not yet read";
}

displayBooks(myLibrary);

const modal = document.querySelector(".modal");
const addBtn = document.querySelector(".open-form");
const myForm = document.getElementById("signUpForm");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = document.getElementById("author").value;
  document.getElementById("author").value = "";
  const title = document.getElementById("title").value;
  document.getElementById("title").value = "";
  const pages = document.getElementById("pages").value;
  document.getElementById("pages").value = "";
  let checkBox = document.querySelector('input[type="checkbox"]').checked;
  addBookToLibrary(title, author, pages, checkBox);
  document.querySelector('input[type="checkbox"]').checked = false;
  displayBooks(myLibrary);

  modal.style.display = "none";
});

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
