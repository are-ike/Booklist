//ES5

//Book Constructor to create book object

// function Book(title, author, isbn){
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
// }

// //UI constructor for manipulating the DOM
// function UI(){

// }
// UI.prototype.addBookToList = function(book){
//     const bookList = document.getElementById('book-list');

//     const row = document.createElement('tr');
//     console.log(row);
//     row.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.isbn}</td>
//         <td><a href="#" class="delete">X</a></td>
//     ` 
//     bookList.appendChild(row);
// }

// UI.prototype.clearInputs = function(){
//     document.getElementById('title').value = '';
//     document.getElementById('author').value = '';
//     document.getElementById('isbn').value = '';
// }

// UI.prototype.showAlert = function (message, classs){
//     //create div for message
//     const div = document.createElement('div');
//     div.appendChild(document.createTextNode(message));
//     //get form and container to insert div
//     const container = document.querySelector('.container');
//     const form = document.querySelector('#book-form');
//     //add class alert
//     div.classList.add('alert');

//     //div styling
//     div.style.color = 'white';
//     div.style.padding = '5px';
//     div.style.margin = '5px 0 15px 0';

//     if(classs === 'error'){
//         div.style.background = 'red';
//     }else{
//         div.style.background = 'green';
//     }

//     container.insertBefore(div, form);

//     setTimeout(function(){
//         document.querySelector('.alert').remove();
//     }, 3000)
// }

// UI.prototype.delete = function (target){
//     if(target.classList.contains('delete')){
//         target.parentElement.parentElement.remove();
//     }
// }


// //add book event listener
// document.getElementById('book-form').addEventListener('submit', (e) => {
//     const title = document.getElementById('title').value,
//           author = document.getElementById('author').value,
//           isbn = document.getElementById('isbn').value;

//     //create book object with form values
//     const book = new Book(title, author, isbn);

//     //instantiate UI
//     const ui = new UI();

//     if(title === '' || author === '' || isbn === ''){
//         ui.showAlert('Please fill in all fields', 'error');
//     }else{
//         ui.addBookToList(book);
//         ui.showAlert('Book Added!', 'success');

//         ui.clearInputs();
//     }
//     e.preventDefault();
// })

// //remove book event listener
// document.getElementById('book-list').addEventListener('click', (e) => {
//     const ui = new UI();

//     ui.delete(e.target);

//     ui.showAlert('Book Removed', 'success');
// })

//*************************************************************************************************** */
//ES6

class Book {
    constructor (title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI{
    
    addBookToList(book){
        const bookList = document.getElementById('book-list');
    
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        ` 
        bookList.appendChild(row);
    }
    
    clearInputs (){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    
    showAlert (message, classs){
        //create div for message
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        //get form and container to insert div
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //add class alert
        div.classList.add('alert');
    
        //div styling
        div.style.color = 'white';
        div.style.padding = '5px';
        div.style.margin = '5px 0 15px 0';
    
        if(classs === 'error'){
            div.style.background = 'red';
        }else{
            div.style.background = 'green';
        }
    
        container.insertBefore(div, form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000)
    }
    
    delete (target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
            LocalStorage.removeBook(target.parentElement.previousElementSibling.textContent);
        }
        
    }
}

class LocalStorage{
    static getBooks(){
        let books = [];
        if(localStorage.getItem('books') !== null){
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    //display books on DOM reload. i called it fetch books, display books would have been better
    static fetchBooks(){
        let books = LocalStorage.getBooks();
        books.forEach((bk) => {
            let newBook = new Book(bk.title, bk.author, bk.isbn);
            const ui = new UI();
            ui.addBookToList(newBook);
            })
        
    }
    static addBook(book){
        let books = LocalStorage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        let books = LocalStorage.getBooks();
        books.forEach((b, i) => {
            if(b.isbn === isbn){
                books.splice(i, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    
    }
}
//adding event to form submit
document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //create book object with form values
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book);
        LocalStorage.addBook(book);
        ui.showAlert('Book Added!', 'success');

        ui.clearInputs();
    }
    e.preventDefault();
})

//remove book event listener
document.getElementById('book-list').addEventListener('click', (e) => {
    const ui = new UI();

    ui.delete(e.target);
    
    // Store.removeBook();

    ui.showAlert('Book Removed', 'success');
})

//fetch books event
document.addEventListener('DOMContentLoaded', LocalStorage.fetchBooks);

