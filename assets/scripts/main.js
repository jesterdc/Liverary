const Liverary = [];

function Book(title, author, pages, read, availability){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.availability = availability;
    this.info = () => {
        console.log(`Title: ${title}, By: ${author}, Pages: ${pages}, ${read ? "Finished Reading" : "Not read yet"}, ${availability ? "Available" : "Not Available"}`);
            }
    }
            
function addBookToLibrary(event) {
    event.preventDefault(); // Prevent form from submitting

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked; // Assuming it's a checkbox
    const availability = document.getElementById("availability").checked; // Assuming it's a checkbox
    
    if((title == null || title == "") || (author == null || author == "") || (pages == null || pages == "")){
        alert("Please fill in all fields");    
        return false;
    }
    else{
        const newBook = new Book(title, author, pages, read, availability)
        Liverary.push(newBook);
        
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").checked = false;
        document.getElementById("availability").checked = false;

        displayBooks()

        }
}
        
        // const sampleBook = new Book("1984", "George Orwell", 1500, true, true);
        // const sampleBook2 = new Book("Game of Thrones", "George R. R. Martin", 1500, true, true);
        // Liverary.push(sampleBook, sampleBook2);
    
function displayBooks(){
    const booksContainer = document.getElementById("bookList");
    booksContainer.innerHTML = "";

    Liverary.forEach((e, index) => {
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
                <button id="delete-button" onClick="deleteBook(${index})">Delete</button>
                <button id="update-button" onClick="updateBook(${index})">Update</button>
            </div>
            <div></div>
        </div>`
    });
}

function deleteBook(index){
    Liverary.splice(index, 1);
    displayBooks();
}

function updateBook(index){

}
