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
invisibleMan.addBookToLibrary()


function displayLibrary(library) {
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
            <img src="./images/cover-example.jpg">
            <h3 class="book-title">${book.title}</h3>
            <span class="book-author">${book.author}</span>
            <p class="book-pages">${book.numberOfPages} pages</p>
            `
            
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

    let allDeleteBookBtn = document.querySelectorAll('.deleteBookBtn')
    allDeleteBookBtn.forEach(btn => btn.addEventListener('click', deleteBook))
}

function updateIndexes() {
    const books = document.querySelectorAll('.book-container')
    books.forEach((book, i) => {
        book.setAttribute('data-key', i)
        book.querySelector('.deleteBookBtn').setAttribute('data-key', i)
    })
}

function deleteBook() {
    console.log(this);
    const bookIndex = this.getAttribute('data-key')
    const divToRemove = document.querySelector(`div[data-key="${bookIndex}"]`)
    divToRemove.remove()
    myLibrary.splice(bookIndex,1)
    updateIndexes()
    displayLibrary(myLibrary)
}

displayLibrary(myLibrary);

const addBookForm = document.getElementById('addBookForm')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    bookData = new FormData(addBookForm)
    const bookTitle = bookData.get('book--title')
    const bookAuthor = bookData.get('book--author')
    const bookPages = bookData.get('book--pages')
    
    const newBook = new Book(bookTitle, bookAuthor, bookPages, false)
    newBook.addBookToLibrary()
    displayLibrary(myLibrary)
})

const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addBookForm.classList.toggle('active')
})

// (e) => {
    
//     const bookIndex = e.currentTarget.getAttribute('data-key')
//     const divToRemove = document.querySelector(`div[data-key="${bookIndex}"]`)
//     divToRemove.remove()
//     myLibrary.splice(bookIndex,1)
//     updateIndexes()
//     console.log(allDeleteBookBtn);
//     displayLibrary(myLibrary)
//     allDeleteBookBtn = document.querySelectorAll('.deleteBookBtn')
// }))