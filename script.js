document.addEventListener('DOMContentLoaded', function() {
    const books = getBooksFromLocalStorage();

    displayBooks();

    document.getElementById('inputBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });

    function addBook() {
        const title = document.getElementById('inputBookTitle').value;
        const author = document.getElementById('inputBookAuthor').value;
        const year = document.getElementById('inputBookYear').value;
        const isComplete = document.getElementById('inputBookIsComplete').checked;

        const book = {
            id: Date.now(),
            title,
            author,
            year: parseInt(year),
            isComplete,
        };

        books.push(book);
        saveBooksToLocalStorage(books);
        displayBooks();
    }

    function displayBooks() {
        const incompleteContainer = document.getElementById('incompleteBookshelfContainer');
        const completeContainer = document.getElementById('completeBookshelfContainer');

        incompleteContainer.innerHTML = '';
        completeContainer.innerHTML = '';

        books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeContainer.appendChild(bookElement);
            } else {
                incompleteContainer.appendChild(bookElement);
            }
        });
    }

    function createBookElement(book) {
        const bookContainer = document.createElement('div');
        bookContainer.setAttribute('data-bookid', book.id);
        bookContainer.setAttribute('data-testid', 'bookItem');
        bookContainer.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton">Hapus buku</button>
            </div>
        `;

        bookContainer.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', function() {
            toggleBookCompletion(book.id);
        });

        bookContainer.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', function() {
            deleteBook(book.id);
        });

        return bookContainer;
    }

    function toggleBookCompletion(bookId) {
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            books[bookIndex].isComplete = !books[bookIndex].isComplete;
            saveBooksToLocalStorage(books);
            displayBooks();
        }
    }

    function deleteBook(bookId) {
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1);
            saveBooksToLocalStorage(books);
            displayBooks();
        }
    }

    function getBooksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('bookshelf')) || [];
    }

    function saveBooksToLocalStorage(books) {
        localStorage.setItem('bookshelf', JSON.stringify(books));
    }
});
