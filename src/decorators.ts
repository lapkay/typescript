/* eslint-disable @typescript-eslint/indent */
// import { getOriginalNode } from "typescript";


export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
   const originalMethod = descriptor.value;

   descriptor.value = function (...arg: any[]) {
      const key = `${methodName}_decor_params_indexes`;
      const proto = typeof target === 'function' ? target.prototype : target;
      const indexes = proto[key];

      if (Array.isArray(indexes)) {
         arg.forEach((arg, index) => {
            if (indexes.includes(index)) {
               console.log(`Method: ${methodName}, paramIndex ${index}`);
            }
         });
      }
      // return originalMethod.apply(this, args);
   };

   return descriptor;
}

function makeProperty<T>(
   prototype: any,
   propertyName: string,
   getTranformer?: (value: any) => T,
   setTranformer?: (value: any) => T,
) {
   const values = new Map<any, T>();

   Object.defineProperty(prototype, propertyName, {
      set(firstValue: any) {
         Object.defineProperty(this, propertyName, {
            get() {
               if (getTranformer) {
                  return getTranformer(values.get(this));
               } else {
                  values.get(this);
               }
            },
            set(value: any) {
               if (setTranformer) {
                  values.set(this, setTranformer(value));
               } else {
                  values.set(this, value);
               }
            },
            enumerable: true
         });
         this[propertyName] = firstValue;
      },
      // enumerable = true,
      // configurable = true
   });
}

export function format(pref: string = 'Mr./Mrs') {
   return function (target: any, propName: string) {
      makeProperty(target, propName, value => `${pref} ${value}`, value => value);
   };
}

export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
   const originalSet = descriptor.set;

   descriptor.set = function (value: number) {
      if (value < 1 || !Number.isInteger(value)) {
         throw new Error('invalid value');
      }

      if (originalSet) {
         originalSet.call(this, value);
      }
   };
   return descriptor;
}