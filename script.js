const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function addBookToLibrary(book) {
    // Get the existing books from localStorage, or an empty array if none exist
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.unshift(book);

    // Save the updated books array back to localStorage
    localStorage.setItem('books', JSON.stringify(books));
}

if (!localStorage.getItem('books')) {
    // If it is, add the initial books to localStorage
    const initialBooks = [
        new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
        new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, true),
        new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false),
        new Book('To Kill a Mockingbird', 'Harper Lee', 281, true),
        new Book('1984', 'George Orwell', 328, false)
    ];
    localStorage.setItem('books', JSON.stringify(initialBooks));
}

function displayBooks() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = ''; // Clear the books div before displaying the books
    let books = JSON.parse(localStorage.getItem('books'));


    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card'); // Add 'book-card' class to each book div

        const title = document.createElement('h2');
        title.textContent = book.title;
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(read);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');

        // button to toggle read status
        const readButton = document.createElement('button');
        readButton.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        readButton.classList.add('read-button');
        readButton.addEventListener('click', () => {
            books[index].read = !books[index].read;
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        });
        buttonDiv.appendChild(readButton);

        // button to delete a book
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            books = books.filter((book, i) => i !== index);
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        });
        buttonDiv.appendChild(removeButton);

        bookCard.appendChild(buttonDiv);

        booksDiv.insertBefore(bookCard, booksDiv.firstChild);
    });
}

displayBooks();

// form visibility toggle
const addBookButton = document.getElementById('add-book-btn');
const closeDialogButton = document.getElementById('close-dialog');
const addBookDialog = document.getElementById('add-book-dialog');

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
    addBookDialog.close();
});

// submit logic
const addBookForm = document.getElementById('add-book-form');
const booksContainer = document.getElementById('books');

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const books = JSON.parse(localStorage.getItem('books'));
    const newBook = new Book(title, author, pages, read);
    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();

    addBookDialog.close();
    addBookForm.reset();
});
