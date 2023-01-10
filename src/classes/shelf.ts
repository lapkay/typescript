import { ShelfItem } from '../interfaces';

/* eslint-disable @typescript-eslint/indent */
export default class Shelf<T extends ShelfItem> {
   private items: T[];

   add(item: T): void {
      this.items.push(item);
   }

   getFitst(): T {
      return this.items[0];
   }
   find(title: string): T {
      return this.items.find(item => item.title === title);
   }

   printTitles(): void {
      this.items.forEach(item => console.log(item.title));
   }
}
// import { Book, Magazine } from './../interfaces';

// export default class Shelf2 {
//    private items: Book[] | Magazine[] = [];

//    add(item: T): void {
//       this.items.push(item);
//    }

//    getFitst(): T {
//       return this.items[0];
//    }
// }