/*Problem Statement: Library Book Management System
-------------------------------------------------
Objective : Create a Book class and use it to manage a collection of books in a library.
Requirements:
  Create a Book class with the following:

  Properties:
      title (string)
      author (string)
      pages (number)
      isAvailable (boolean, default: true)
  Methods:
      borrow() - Marks the book as not available
      returnBook() - Marks the book as available
      getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
      isLongBook() - Returns true if pages > 300, false otherwise

  1. Create at least 5 book objects using the class:
      Example: "Harry Potter", "1984", "The Hobbit", etc.


  2. Perform the following operations:

      i. Display info of all books
      ii. Borrow 2 books and show their availability status
      iii. Return 1 book and show updated status
      iv. Count how many books are "long books" (more than 300 pages)
      v. List all available books
      */

// Book class
class Book {
  constructor(title, author, pages, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isAvailable = isAvailable;
  }

  // Marks the book as not available
  borrow() {
    if (this.isAvailable) {
      this.isAvailable = false;
      console.log(`${this.title} has been borrowed.`);
    } else {
      console.log(`${this.title} is already borrowed.`);
    }
  }

  // Marks the book as available
  returnBook() {
    this.isAvailable = true;
    console.log(`${this.title} has been returned.`);
  }

  // Returns book info
  getInfo() {
    return `${this.title} by ${this.author} (${this.pages} pages)`;
  }

  // Checks if book is long
  isLongBook() {
    return this.pages > 300;
  }
}

// 1. Create at least 5 book objects
let b1 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
let b2 = new Book("1984", "George Orwell", 328);
let b3 = new Book("Harry Potter", "J.K. Rowling", 309);
let b4 = new Book("Atomic Habits", "James Clear", 281);
let b5 = new Book("Husky Tales", "Manaswi", 180);

// Store all books
let allBooks = [b1, b2, b3, b4, b5];


// i. Display info of all books
console.log("All Books:");
allBooks.forEach(book => console.log(book.getInfo()));


// ii. Borrow 2 books and show availability
b1.borrow();
b2.borrow();

console.log("\nAvailability after borrowing:");
allBooks.forEach(book =>
  console.log(`${book.title}: ${book.isAvailable}`)
);


// iii. Return 1 book and show updated status
b1.returnBook();

console.log("\nAvailability after returning one book:");
allBooks.forEach(book =>
  console.log(`${book.title}: ${book.isAvailable}`)
);


// iv. Count how many books are long books (>300 pages)
let longBooksCount = allBooks.filter(book => book.isLongBook()).length;
console.log(`\nNumber of long books: ${longBooksCount}`);


// v. List all available books
let availableBooks = allBooks.filter(book => book.isAvailable);
console.log("\nAvailable Books:");
availableBooks.forEach(book => console.log(book.title));

