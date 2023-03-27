import { Constants } from '@/util'


export default class Validate {
   static required(value: string) {
      return !!value;
   }

   static isEmail(value: string) {
      return /^(([a-z0-9]){4,}@([a-z]){2,}\.([a-z]){2,})$/i.test(value);
   }

   static isYYYYMMDD(value: string) {
      return /^((1|2)(0|9)[0-9]{2})\/((0[1-9]{1})|(1[0-2]{1}))\/(([0-2]{1}[0-9]{1})|(3[0-1]{1}))$/.test(value);
   }

   static isPhone(value: string) {
      return /^0([0-9]{9})$/.test(value);
   }
   //(___) ___ - ____
   static is10NumbersPhone(value: string) {
      return /^0([0-9]{9})$/.test(value);
   }

   static isValidDistrict(value: string) {
      return Constants.districts.includes(value);
   }

   static isYearInterval(value: string) {
      return /^\d{4}-\d{4}$/.test(value);
   }

   static lengthInterval(min: number, max: number) {
      return function (value: string | any[]) {
         return value.length >= min && value.length <= max;
      }
   }

   static isNumber(v: any) {
      return typeof Number(v) === 'number' && !Number.isNaN(Number(v));
   }

   static minMax(min: number, max: number) {
      return function (v: string | number) {
         return Number(v) >= min && Number(v) <= max;
      }
   }

   static isLatinOrUnderscore(str: string) {
      return /\w/.test(str);
   }

   static noManySpaces(str: string) {
      return /^((?!\s{2}).)*$/.test(str);
   }
}