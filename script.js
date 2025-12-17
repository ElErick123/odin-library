const bookLibrary = document.getElementById("books");
const addBookModal = document.getElementById("add-book-modal");
const addBookButton = document.getElementById("add-book-button");
const bookTitleInput = document.getElementById("title");
const bookAuthorInput = document.getElementById("author");
const bookPagesInput = document.getElementById("pages");
const addBookModalButton = document.getElementById("add-book-modal-button");
const bookReadInputs = document.getElementsByName("read");
const bookDeleteButtons = document.querySelectorAll(".delete-button");
const bookToggleReadButtons = document.querySelectorAll("toggle-read-button");
const books = document.querySelectorAll(".book");

let bookArray = [];

function Book(title, author, pages, wasRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = JSON.parse(wasRead);
}

function addBookToLibrary(title, author, pages, wasRead) {
    let book = new Book(title, author, pages, wasRead);
    bookArray.push(book);
}

function showAllBooks() {
    bookLibrary.textContent = "";
    for (let book of bookArray) {
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("h2");
        const bookAuthor = document.createElement("h3");
        const bookPages = document.createElement("span");
        const bookWasRead = document.createElement
        ("span");
        const deleteBookButton = document.createElement("button");
        const toggleReadButton = document.createElement("button");
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        bookWasRead.textContent = book.wasRead ? "Has been read" : "Has not been read";
        deleteBookButton.textContent = "Delete book";
        toggleReadButton.textContent = "Toggle read";
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookWasRead);
        bookCard.appendChild(deleteBookButton);
        bookCard.appendChild(toggleReadButton);
        bookCard.classList.add("book");
        deleteBookButton.classList.add("delete-button");
        toggleReadButton.classList.add("toggle-read-button")
        bookCard.dataset.id = book.id;
        bookLibrary.appendChild(bookCard);
        deleteBookButton.addEventListener("click", (e) => {
            const bookToDelete = e.target.parentNode;
            const bookID = bookToDelete.dataset.id;
            for (let i = 0; i <= bookArray.length; i++) {
                if (bookArray[i].id === bookID) {
                    bookArray.splice(i, 1);
                    break;
                }
            }
            showAllBooks();
        });
        toggleReadButton.addEventListener("click", (e) => {
            const bookToFind = e.target.parentNode;
            const bookID = bookToFind.dataset.id;
            for (let i = 0; i <= bookArray.length; i++) {
                if (bookArray[i].id === bookID) {
                    bookArray[i].wasRead = bookArray[i].wasRead ? false : true;
                    break;
                }
            }
            showAllBooks();
        });
    }
}

addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookReadInputs[0].checked = true;
});

addBookModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!bookTitleInput.value || !bookAuthorInput.value || !bookPagesInput.value) {
        alert("Please fill in all the boxes");
        return;
    }

    const bookReadInput = document.querySelector("input[name=read]:checked");
    addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookReadInput.value);
    addBookModal.close();
    showAllBooks();
});

addBookModal.addEventListener("click", (e) => {
    if (e.target === addBookModal) {
        addBookModal.close();
    }
});

addBookToLibrary("My life story", "Me", 15, true);
showAllBooks();