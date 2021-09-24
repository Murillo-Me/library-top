let myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

const invisibleMan = new Book('Invisible Man', 'Ralph Ellison', 581, false)
const beautifulWorld = new Book('Beautiful World, Where Are You: A Novel', 'Sally Rooney', 353, false)
const briefHistoryOfTime = new Book('A Brief History of Time', 'Stephen Hawking', 212, true)

function addBookToLibrary() {
    myLibrary.push(this)
}

Book.prototype.addBookToLibrary = addBookToLibrary

invisibleMan.addBookToLibrary()
beautifulWorld.addBookToLibrary()
briefHistoryOfTime.addBookToLibrary()

function displayLibrary(library) {
    const bookRowDiv = document.querySelector('.book-row')
    console.log(bookRowDiv);
    library.forEach(book => {
        const bookDiv = document.createElement('div')
        bookDiv.setAttribute('class', 'book-container')
        bookDiv.innerHTML = `
        <img src="./images/cover-example.jpg">
        <h3 class="book-title">${book.title}</h3>
        <span class="book-author">${book.author}</span>
        <p class="book-pages">${book.numberOfPages} pages</p>
        `
        bookRowDiv.append(bookDiv)

        console.log(bookDiv);
    })
}

displayLibrary(myLibrary);