class Book {
    //Book main information
    constructor(title, author, pages, read, availability){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.availability = availability;
    }

    //Prints the book information
    info()
    {
        console.log(`Title: ${this.title}, By: ${this.author}, Pages: ${this.pages}, ${this.read? "Finished Reading" : "Not read yet"}, ${this.availability? "Available" : "Not Available"}`);
    }
}

class Library {
    //Library main information
    constructor() {
        this.books = [];
    }

    displayBook(){
        const booksContainer = document.getElementById("bookList");
        booksContainer.innerHTML = ""

        this.books.forEach((e, index) => {
            booksContainer.innerHTML += 
            `
            <div class="card">
                <div></div>
                <div class="card-body">
                    <h2 class="card-title">${e.title}</h2>
                    <div class="card-author">
                        <h5 class="card-subtitle mb-2 text-muted">by ${e.author}</h5>
                        <p class="card-text"><b>${e.pages}</b> Pages</p>
                    </div>
                    <div class="card-book-status">
                        <p class="card-text">${e.read? "<span id='finished'>Finished Reading</span>" : "<span id='not-finished'>Not read yet</span>"}</p>
                    </div>
                    <div class="card-book-status">
                        <p class="card-text">${e.availability? "<span id='available'>Available</span>" : "<span id='not-available'>Not Available</span>"}</p>
                    </div>
                </div>
                <div class="card-buttons">
                    <button id="delete-button" onClick="library.deleteBook(${index}); library.displayBook();">Delete</button>
                    <button id="update-button" onClick="library.populateFormToUpdate(${index})">Update</button>
                </div>
                <div></div>
            </div>`;

        });
    }

    //Adds the book to the array collection of books
    addBook(newBook){
        this.books.push(newBook);
    }

    //Deletes the book from the array
    deleteBook(index){
        this.books.splice(index, 1);
    }

    //Updates the book information using its index
    updateBook(index, updatedBook){
        this.books[index] = updatedBook;
    }

    populateFormToUpdate(index){
        const book = this.books[index];

        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("pages").value = book.pages;
        document.getElementById("read").checked = book.read;
        document.getElementById("availability").checked = book.availability;

        document.getElementById("book-input").onsubmit = (event) => {
            event.preventDefault()
            this.updateBookForm(index, event)
        }
    }

    updateBookForm(index, event){
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        const availability = document.getElementById("availability").checked;

        if((title == null || title == "") || (author == null || author == "") || (pages == null || pages == "")){
            alert("Please fill in all fieldss");    
            return false;
        }
        else {
            const updatedBook = new Book(title, author, pages, read, availability);
            this.updateBook(index, updatedBook);

            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("pages").value = "";
            document.getElementById("read").checked = false;
            document.getElementById("availability").checked = false;

            //Revert the submit button to the addBook function
            document.getElementById("book-input").onsubmit = (event) => this.addBookFromForm(event);
            this.displayBook();
        }
    }

    addBookFromForm(event){
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        const availability = document.getElementById("availability").checked;

        if((title == null || title == "") || (author == null || author == "") || (pages == null || pages == "")){
            alert("Please fill in all fields");    
            return false;
        }
        else {
            const newBook = new Book(title, author, pages, read, availability);
            this.addBook(newBook);

            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("pages").value = "";
            document.getElementById("read").checked = false;
            document.getElementById("availability").checked = false;

            this.displayBook();
        }
    }
}

const library = new Library();

document.getElementById("book-input").onsubmit = (event) => library.addBookFromForm(event);