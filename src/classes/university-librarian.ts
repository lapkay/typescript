
/* eslint-disable @typescript-eslint/indent */
import * as Interfaces from './../interfaces';
// import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';
// import { Librarian } from './../interfaces';


// @sealed('UniversityLibrarian')
// @logger

class UniversityLibrarian implements Interfaces.Librarian {
   // @format()
   name: string;
   email: string;
   department: string;

   // @logMethod
   assistCustomer(custName: string, bookTitle: string): void {
      console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
   }

   // @writable(true)
   assistFaculty(): void {
      console.log('Assisting faculty');
   }

   // @writable(false)
   teachCommunity(): void {
      console.log('Teaching community');
   }
}

export { UniversityLibrarian };