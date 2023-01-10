/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-redeclare */

import { Category } from './enums';
import { Book, CallBack, LibMgrCallBack, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';



export function getAllBooks(): readonly Book[] {
   const books = <const>[
      { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
      { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
      { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
      { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
   ];

   return books;
}

export function createCustomerID(name: string, id: number): string {
   return `${name} / ${id}`;
}
createCustomerID('Igor', 10);

let myID: string = createCustomerID('Ann', 10);
console.log(myID);

// let idGenerator: (name: string, id: number) => string;
let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${name} / ${id}`;
idGenerator = createCustomerID;
console.log(idGenerator('Lina', 19));


export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
   console.log(`Number of books: ${books.length}`);
   const title = books.find(book => book.available).title;

   console.log(`First avalable book: ${title}`);
}


export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
   const books = getAllBooks();
   return books
      .filter(book => book.category === inputCategory)
      .map(book => book.title);
}



export function logBookTitles(titles: Array<string>): void {
   titles.forEach(title => console.log(title));
}



export function getBookAuthorByIndex(index: number): [title: string, author: string] {
   const books = getAllBooks();

   const { title, author } = books[index];
   return [title, author];
};



export function calcTotalPages(): void {
   const data = <const>
      [
         { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
         { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
         { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
      ];

   const r = data.reduce((acc: bigint, obj) => {
      return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
   }, 0n);
   console.log(r);
}


export function getBookById(id: Book['id']): BookOrUndefined {
   const books = getAllBooks();

   return books.find(book => book.id === id);
}

console.log(getBookById(1));



export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
   const books = getAllBooks();

   if (args.length === 1) {
      const [arg] = args;

      if (typeof arg === 'string') {
         return books.filter(book => book.author === arg).map(book => book.title);

      } else if (typeof arg === 'boolean') {
         return books.filter(book => book.available === arg).map(book => book.title);
      }
   } else if (args.length === 2) {
      const [id, avaliable] = args;
      if (typeof id === 'number' && typeof avaliable === 'boolean') {
         return books.filter(book => book.id === id && book.available === avaliable).map(book => book.title);
      }
   }
}

getTitles(1, true);



// 4 task


export function createCustomer(name: string, age?: number, city?: string): void {
   console.log(`customer name: ${name}`);

   if (age) {
      console.log(`customer age: ${age}`);
   }

   if (city) {
      console.log(`customer city: ${city}`);
   }
}
createCustomer('Anna', 30, 'Lviv');

console.log(getBookTitlesByCategory());
console.log(getBookTitlesByCategory(Category.CSS));
console.log(logFirstAvailable());



function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
   console.log(`Customer name: ${customer}`);

   return bookIDs
      .map(id => getBookById(id))
      .filter(book => book.available)
      .map(book => book.title);

};

console.log(checkoutBooks('Yaroslav', 1, 3, 4));



// assertion function


export function assertStringValue(data: any): asserts data is string {
   if (typeof data !== 'string') {
      throw new Error('value should have been a string');
   }
}


function assertRefBookInstance(condition: any): asserts condition {
   if (!condition) {
      throw new Error('It is not an instance of RefBook');
   }
}



function bookTitleTransform(title: any): string {
   assertStringValue(title);

   return [...title].reverse().join('');
}

bookTitleTransform('namebook');
bookTitleTransform(1);


export function printBook(book: Book): void {
   console.log(`${book.title} by ${book.author}`);
}


export function getProperty(book: Book, prop: BookProperties): any { // task 04.05
   const value = book[prop];
   return typeof value === 'function' ? value.name : value;
}


export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
   const value = obj[prop];
   return typeof value === 'function' ? value.name : value;
}



export function setDefaultConfig(options: TOptions) {
   options.duration ??= 100;
   options.speed ??= 60;

   return options;
}

export function printRefBook(data: any): void {
   assertRefBookInstance(data instanceof RefBook);
   data.printItem();
}



// generic function
// export function purge<T>(inventory: T[])
export function purge<T>(inventory: Array<T>): T[] {
   return inventory.slice(2);
}


export function getBooksByCategory(category: Category, callback: LibMgrCallBack): void {
   // export function getBooksByCategory(category: Category, callback: CallBack<string[]>): void {
   setTimeout(() => {
      try {
         const titles = getBookTitlesByCategory(category);

         if (titles.length > 0) {
            callback(null, titles);
         } else {
            throw new Error('no books found');
         }
      } catch (error) {
         callback(error, null);
      }
   }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
   if (err) {
      console.log(err.message);
   } else {
      console.log(titles);
   }
}


export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
   const p: Promise<string[]> = new Promise((resolve, reject) => {
      setTimeout(() => {
         const titles = getBookTitlesByCategory(category);
         if (titles.length > 0) {
            resolve(titles);
         } else {
            reject('no books found');
         }
      }, 2000);
   });

   return p;
}


export async function logSearchResult(category: Category) {
   const titles = await getBooksByCategoryPromise(category);
   console.log(titles.length);
   return Promise.resolve(titles);
}