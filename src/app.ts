/* eslint-disable @typescript-eslint/indent */

import { idText, Type } from 'typescript';
import { ReferenceItem, UL, RefBook, Shelf } from './classes';
import { Category } from './enums';
import { purge, printRefBook, getAllBooks, getBookAuthorByIndex, getBookById, getBookTitlesByCategory, getProperty, logFirstAvailable, getObjectProperty, createCustomer, logCategorySearch, getBooksByCategory, getBooksByCategoryPromise, logSearchResult } from './functions';
import { Author, Book, Librarian, Logger, TOptions, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';
import { Library } from './classes/library';
// import RefBook from './classes/encyclopedia';



showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}




class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;
    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    };

}


// ===========================================
// task 02.01
console.log(getAllBooks());
console.log(logFirstAvailable(getAllBooks()));
console.log(getBookAuthorByIndex(0));

// console.log(calcTotalPages());

// task 3


// task 04.01

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3
    pages: 200,
    // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
    markDamaged: (reason: string) => {
        console.log(`Damaged: ${reason}`);
    }
};

// printBook(myBook);

myBook.markDamaged('missing back cover');


// task 04.02

// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);

logDamage('missing back cover');

// task 04.03

// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     numBooksPublished: 2
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Boris',
//     email: '@examborisple.com',
//     department: 'Classical Literature',
//     assistCustomer: null
// };


// task 04.04

const offer: any = {
    book: {
        title: 'Essential Typescript',
    }
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[0]);


// task 04.05 keyof


console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'isbn'));
console.log(getProperty(myBook, 'markDamaged'));


// task 05.01 class



// const ref = new ReferenceItem(1, 'learn Typescript', 2022);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'abc group';
// console.log(ref.publisher);
// console.log(ref.getID());


// task 05.02 05.03

// const refBook: RefBook = new RefBook(1, 'learn Typescript', 2022, 2);
// refBook.printItem();
// refBook.printCitation();

// task 05.04


// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn Typescript');


// task 05.05

const personBook: PersonBook = {
    name: 'Anna',
    author: 'Anna',
    available: false,
    category: Category.Angular,
    email: 'anna@example.com',
    id: 1,
    title: 'Unknow'
};

// task 06.03, 06.04

// const refBook: RefBook = new RefBook(1, 'learn Typescript', 2022, 2);
// printRefBook(refBook);

// const favorteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);


// task 06.05

// const flag = true;

// if (flag) {
//     import('./classes')
//         .then(o => {
//             const reader = new o.Reader();
//             reader.name = 'anna';
//             reader.take(getAllBooks()[0]);

//             console.log(reader);
//         })
//         .catch(err => console.log(err))
//         .finally(() => console.log('Complete'));
// }

// //

// if (flag) {
//     const o = await import('./classes');

//     const reader = new o.Reader();
//     reader.name = 'anna';
//     reader.take(getAllBooks()[0]);

//     console.log(reader);
// }

// task 06.06
// let library: Library = new Library();
let library: Library = {
    id: 1,
    adress: '',
    name: 'Anna'
};


// task 07.01

const inventory: Book[] = [
    { id: 10, title: 'The C programming Language', author: '???', available: true, category: Category.Sowtware },
    { id: 11, title: 'Code complete', author: 'Steve McConnel', available: true, category: Category.Sowtware },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Sowtware },
    { id: 13, title: 'Cool autoexec.bat Scripts', author: 'C. D.', available: true, category: Category.Sowtware }
];

// const result1 = purge(inventory);
// const result2 = purge([1, 2, 3]);
// console.log(result1);
// console.log(result2);


// task 07/02, 07.03

// const bookShelf: Shelf<Book> = new Shelf<Book>();
// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));

// console.log(bookShelf.getFitst().title);


// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mars' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' },
// ];

// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach(mag => magazineShelf.add(mag));
// console.log(magazineShelf.getFitst().title);

// magazineShelf.printTitles();
// console.log(magazineShelf.find('five Points'));


// console.log(getObjectProperty(magazines[0], 'title'));
// console.log(getObjectProperty(inventory[1], 'author'));



// 07.04 utility types


// const bookRequiredFields: BookRequiredFields = {
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     id: 1,
//     markDamaged: null,
//     pages: 200,
//     title: 'Learn Angular'
// };

// const updatedBook: UpdatedBook = {
//     id: 1,
//     pages: 300
// };

// let params: Parameters<CreateCustomerFunctionType>;

// params = ['Ann', 30, 'Kyiv'];
// createCustomer(...params);


// task 8.03
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.assistFaculty =null;
// favoriteLibrarian.teachCommunity = null;

// task 8.04
// const refBook: RefBook = new RefBook(1, 'Learn Typescript', 2022, 2);
// refBook.printItem();

// task 8.05
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian);
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn Typescript');

// task 8.06
// const favoriteLibrarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// console.log(favoriteLibrarian.name);
// favoriteLibrarian.assistCustomer('Boris', 'Learn Typescript');
// console.log(favoriteLibrarian);


// tsk 08.07
// const refBook: RefBook = new RefBook(1, 'Learn Typescript', 2022, 2);
// refBook.copies = 10;
// console.log(refBook.copies);

// task 09.01
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Sowtware, logCategorySearch);
// console.log('End');


// task 09.02
// console.log('Begin');
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log(titles);
//         return Promise.resolve(titles.length);
//     })
//     .then(n => console.log(n))
//     .catch(reason => console.log(reason));
// getBooksByCategoryPromise(Category.Sowtware)
//     .then(titles => console.log(titles))
//     .catch(reason => console.log(reason));
// console.log('End');


// task 09.03
console.log('Begin');
logSearchResult(Category.JavaScript);
logSearchResult(Category.Sowtware).catch(err => console.log(err));
console.log('End');

