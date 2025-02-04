## Problem Statement: Library Management System

You are tasked with designing a Library Management System using TypeScript.
-  The system should allow adding books to a library and borrowing books from it.

The implementation must follow these constraints:
### Requirements:

- Create a namespace called LibrarySystem to encapsulate all related classes.

### Define a class Book with the following properties:

1. title (string) - public
2. author (string) - public
3. isbn (string) - private (should not be accessible outside the class)
4. A constructor to initialize all the properties.

### Define another class Library that manages a collection of books.

1. A private array books that stores Book objects.
2. A method addBook(book: Book) to add a new book to the library.
3. A method borrowBook(title: string): Book | null that allows borrowing a book by title.

### Create a derived class PublicLibrary that extends Library with an additional feature:

1.  A method displayBooks() that prints all available books in the library.
```
Example Usage:
const library = new LibrarySystem.PublicLibrary();
library.addBook(new LibrarySystem.Book("The Alchemist", "Paulo Coelho", "123456"));
library.addBook(new LibrarySystem.Book("Atomic Habits", "James Clear", "654321"));
library.displayBooks();
const borrowed = library.borrowBook("The Alchemist");
console.log(borrowed ? `Borrowed: ${​​​​​​borrowed.title}​​​​​​` : "Book not available");
```

### Your Task
- Implement the required classes and methods.
- Ensure isbn remains private and cannot be accessed directly.
- Use appropriate access modifiers (public, private, protected).
- Use inheritance correctly to extend Library into PublicLibrary.
- Encapsulate everything inside the LibrarySystem namespace.

## Things covered in this problem

1. class
2. Access Modifiers
3. Inheritance, and
4. Namespaces


_______________________________________

1. Decorators
https://blog.logrocket.com/practical-guide-typescript-decorators/
https://www.digitalocean.com/community/tutorials/how-to-use-decorators-in-typescript

2. Generic Types
https://www.w3schools.com/typescript/typescript_basic_generics.php

3. Partial
https://www.geeksforgeeks.org/typescript-partialtype-utility-type/ 