function Book(title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;

    // https://openlibrary.org/dev/docs/api/search
    // https://openlibrary.org/dev/docs/api/covers
    this.cover = fetch(`https://openlibrary.org/search.json?q=${title}`).then(response => (response.json())).then(data => {return this.isbn = data.docs[0].isbn[0]})
    .then(isbn => {return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}).catch(() => {return './images/cover-example-placeholder.jpg'})

}

function addBookToLibrary() {
    myLibrary.push(this)
    addToLocalStorage('library', myLibrary)
}

function addToLocalStorage(key, value) {
    if (typeof(value) != 'object') {
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

async function displayLibrary(library) {
    const bookshelfDiv = document.querySelector('.bookshelf-main-container')
    bookshelfDiv.textContent = ''

    if (library.length > 0) {
        library.forEach((book, i) => {
            if (i == 0) {
                const rowBottom = document.createElement('div')
                rowBottom.classList.add('row-bottom')
                bookshelfDiv.append(rowBottom)
            }

            const bookDiv = document.createElement('div')
            bookDiv.setAttribute('class', 'book-container')
            bookDiv.setAttribute('data-key', `${i}`)

            bookDiv.innerHTML = `
            <button class="closeBtn deleteBookBtn" data-key="${i}">X</button>
            <div class="skeleton book-cover"></div>
            <h3 class="book-title">${book.title}</h3>
            <span class="book-author">${book.author}</span>
            <button class="book-status-btn ${(book.isRead) ? 'read' : ''}" data-key="${i}">${(book.isRead) ? 'Already read' : 'Not read'}</button>
            <p class="book-pages">${book.numberOfPages} pages</p>
`
            book.cover.then(cover => {
                bookDiv.innerHTML = `
                        <button class="closeBtn deleteBookBtn" data-key="${i}">X</button>
                        <img class="book-cover" src="${cover}">
                        <h3 class="book-title">${book.title}</h3>
                        <span class="book-author">${book.author}</span>
                        <button class="book-status-btn ${(book.isRead) ? 'read' : ''}" data-key="${i}">${(book.isRead) ? 'Already read' : 'Not read'}</button>
                        <p class="book-pages">${book.numberOfPages} pages</p>
            `

                addBookEventListeners()
            })
            
            bookshelfDiv.append(bookDiv)

            if ((i+1) % 4 == 0 && i != 0 && (i+1) != library.length) {
                const rowBottom = document.createElement('div')
                rowBottom.classList.add('row-bottom')
                bookshelfDiv.append(rowBottom)
            }
        })
    } else {
        bookshelfDiv.style.height = '283px'

        const rowBottom = document.createElement('div')
        rowBottom.classList.add('row-bottom')
        bookshelfDiv.append(rowBottom)
    }

    const rowBottom = document.createElement('div')
    rowBottom.classList.add('row-bottom')
    bookshelfDiv.append(rowBottom)

    addBookEventListeners()
}

function addBookEventListeners() {
    let allDeleteBookBtn = document.querySelectorAll('.deleteBookBtn')
    allDeleteBookBtn.forEach(btn => btn.addEventListener('click', deleteBook))

    const readBtn = document.querySelectorAll('.book-status-btn')
    readBtn.forEach(btn => btn.addEventListener('click', changeReadStatus))
}

function updateIndexes() {
    const books = document.querySelectorAll('.book-container')
    books.forEach((book, i) => {
        book.setAttribute('data-key', i)
        book.querySelector('.deleteBookBtn').setAttribute('data-key', i)
    })
}

function deleteBook() {
    const bookIndex = this.getAttribute('data-key')
    const divToRemove = document.querySelector(`div[data-key="${bookIndex}"]`)
    divToRemove.remove()
    myLibrary.splice(bookIndex,1)
    updateIndexes()
    displayLibrary(myLibrary)
}

function changeReadStatus() {
    const bookIndex = this.getAttribute('data-key')
    this.classList.toggle('read')
    if (this.classList.contains('read')) {
        this.textContent = 'Already read'
        myLibrary[bookIndex].isRead = true
    } else {
        this.textContent = 'Not read'
        myLibrary[bookIndex].isRead = false
    }
}

function clearAllBooks() {
    myLibrary.length = 0
    displayLibrary()
}

let myLibrary = [];

const invisibleMan = new Book('Invisible Man', 'Ralph Ellison', 581, true)
const beautifulWorld = new Book('Beautiful World, Where Are You: A Novel', 'Sally Rooney', 353, false)
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 200, false)
const thePurse = new Book('The Purse', 'Julie A. Burns', 278, false)
const timeAndTimeAgain = new Book('Time and Time Again', 'Ben Elton', 386, true)

Book.prototype.addBookToLibrary = addBookToLibrary

invisibleMan.addBookToLibrary()
beautifulWorld.addBookToLibrary()
theGreatGatsby.addBookToLibrary()
thePurse.addBookToLibrary()
timeAndTimeAgain.addBookToLibrary()

displayLibrary(myLibrary);

const addBookForm = document.getElementById('addBookForm')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    bookData = new FormData(addBookForm)
    const bookTitle = bookData.get('book--title')
    const bookAuthor = bookData.get('book--author')
    const bookPages = bookData.get('book--pages')
    const bookIsRead = bookData.get('read-status-checkbox')
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead)
    newBook.addBookToLibrary()
    displayLibrary(myLibrary)
    addBookForm.classList.toggle('active')
})

const newBookBtn = document.getElementById('new-book')
newBookBtn.addEventListener('click', () => {
    addBookForm.classList.toggle('active')
    addBookForm.querySelector('input:first-of-type').focus()
})

const clearAllBtn = document.getElementById('clear-all-btn')
clearAllBtn.addEventListener('click', clearAllBooks)

const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addBookForm.classList.toggle('active')
})