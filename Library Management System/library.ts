namespace LibrarySystem {

    export class Book {
        title: string;
        author: string;
        private isbn: string;

        constructor(title: string, author: string, isbn: string) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }

    class Library {
        private books: Book[];

        constructor() {
            this.books = [];
        }

        // add new book to the library
        addBook(book: Book) {
            this.books.push(book);
        }

        // borow book
        borrowBook(title:String): Book | null {
            const bookslist = this.books;
            for (var i=0;i<bookslist.length;i++){
                // console.log(bookslist[i])
                if (title===bookslist[i].title){
                    const rembook : Book[] = this.books.splice(i,1) // returns an array
                    const borrowBook = rembook[0];
                    return borrowBook;
                }
            }
            return null
        }

        getBook() :Book[]{
            return this.books;
        }

    }

    export class PublicLibrary extends Library {
        displayBooks() {
            const bookslist = this.getBook()
            if (bookslist.length!=0){
                for (var i=0;i<bookslist.length;i++){
                    console.log(bookslist[i])
                }
            }
            else{
                console.log("Books are Empty")
            }
        }
    }
}

const library = new LibrarySystem.PublicLibrary();
library.addBook(new LibrarySystem.Book("The Alchemist", "Paulo Coelho", "123456"));
library.addBook(new LibrarySystem.Book("Atomic Habits", "James Clear", "654321"));

console.log("Display Books:")
library.displayBooks()

var borrowed = library.borrowBook("The Alchemist");
console.log(borrowed ? `Borrowed: ${​​​​​​borrowed.title}​​​​​​` : "Book not available");

console.log("Display Books:")
library.displayBooks()

// var borrowed = library.borrowBook("Atomic Habits");
// console.log(borrowed ? `Borrowed: ${​​​​​​borrowed.title}​​​​​​` : "Book not available");

// console.log("Display Books:")
// library.displayBooks()



