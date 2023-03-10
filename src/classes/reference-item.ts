/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/indent */

abstract class ReferenceItem {
   // title: string;
   // year: number;

   // constructor(newTitle: string, newYear: number) {
   //     console.log('title was published in year...');
   //     this.title = newTitle;
   //     this.year = newYear;
   // }

   #id: number;

   private _publisher: string;

   get publisher(): string {
      return this._publisher.toUpperCase();
   }

   set publisher(newPublisher: string) {
      this._publisher = newPublisher;
   }

   static department: string = 'Reserch Dep.';


   constructor(
      id: number,
      public title: string,
      protected year: number) {
      console.log('Creating new ReferenceItem...');
      this.#id = id;
   }

   printItem(): void {
      console.log(`${this.title} was published in ${this.year}`);
      console.log(ReferenceItem.department);
      console.log(Object.getPrototypeOf(this).constructor.department);
   };

   getID(): number {
      return this.#id;
   }

   abstract printCitation(): void;
}




export { ReferenceItem };