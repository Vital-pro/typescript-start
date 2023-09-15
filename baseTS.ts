let a: number = 4;
let b = 'sdfs';
let c = true;

let d: string[] = ['a', 'bfgh', 'gc'];

let e: any = 3;
e = 'dfghdf';

function test(a: string): number | string {  //? так показывает, что возвращает ф-ция (число или строку)
  return '';
}

const test2 = (a: number): number => {
  return a * 2;
}

const test3 = (a: number): void => {  //? void -> так указываем, что ф-ция ничего не возвращает
  return;
}

d = d.map((x: string) => x.toLowerCase());

function countCoord(coord: {lat: number, long?: number}) {}

function printIt(id: number | string) {
  if (typeof id === 'number') {
    console.log(id.toString());
  } else if(typeof id === 'string') {
  id.toUpperCase()
  }
}

function getSum(a: number | number[]) {
  if(Array.isArray(a)) {
    
  }
}

const x: undefined = undefined;
const z: null = null;

//todo Types and interfaces  /

      //* creation by type

type stringOrNumber = string | number; // простые типы

function strOrNum(res: stringOrNumber) {}

type Point = {
  x: number, 
  y: number
}

function print(coord: Point) {}

         //* extend-ить by type
type Point3D = Point & {
  z: number;
}

//* create by interface (почти аналогично type, но в TS рекомендуется использовать interface) Координальное отличие: один из interface может extend-ить другое Но типам недоступно ДОБАВление свойств, как это возможно с interface

//* creation by interface
interface IPoint {
  x: number, 
  y: number
}

function print(coord: IPoint) {}


//* extend-ить by interface
interface I3DPoint extends IPoint {
  z: number;
}

    //* Но типам недоступно ДОБАВление свойств, как это возможно с interface":
interface ITest {
  a: number;
}

interface ITest {
  b: number;   // добавили свойство
}

const fn = (point: IPoint) => {
  const d: I3DPoint = point as I3DPoint;
}
// example
const myCanvas = document.getElementById('canvas') as HTMLCanvasElement;

//! Рекомедуется использовать везде interface. А types только по необходимости, если литеральные, например, 
//! или вариант type stringOrNumber = string | number;

//todo  Литеральные types:
let j: 'example' = 'example'; // - это и есть литеральный тип
// Example:
type typeAction = 'up' | 'down';

function performAction(action: typeAction): -1 | 1 {
  switch(action) {
    case 'up': 
      return 1;
    case 'down': 
    return -1;
  }
}

//? Так же литеральные типы могут быть скомбинированы вместе с обычным interface

interface ComplexAction {
  S: string;
}

function performAction2(action: typeAction | ComplexAction) {
  switch(action) {
    case 'up': 
      return 1;
    case 'down': 
    return -1;
  }
}

//! Practice
// Example .json
{
  "id": 1
  "userId": 1,
  "userName": "Jhon", 
  "info": {
    "profile": "ts",
    "isActive": false
  },
  "tags": [
    {
      "avatar": "name",
      "value": 500
    }
  ]
}

//Answer .ts
interface Info {
  profile: string;
  isActive: boolean;
}

interface Tags {
  avatar: string;
  value: number;
}

interface RootElement {
  id: number;
  userId: number;
  title: string;
  info: Info;
  tags: Tags[];
}

   //! Enums - использовать, когда мы хотим ограничить область значений какой-либо переменной
   // Числовые enums
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
} // default будет -> 0, 1, 2, 3 (называется числовой enum. Можем менять значения, автоматом меняются остальные)

// Строковые enums. Мы должны явно задать строку
enum DirectionString {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}   //  Мы должны явно задать строку

// Гетерогенные enums
enum Choice {
  Yes = 1,
  No = 'No'
}

//Расчитываемые enums (могуь быть только числовыми, но НЕ строковыми)
enum Calculations {
  Yes = 1,
  No = calc()  //используем ф-цию
}

function calc() {
  return 3;
}

// Редко применимые, как объекты в runtime 
function runEnum(obj: {Up: string}) {};

runEnum(DirectionString);

// Понятие обратного mappings (маппинга), когда нам нужно получить строковое значение какого-то из enums

enum Test {
  A
}

let exemple = Test.A;
let strA = Test[exemple]; //? A  (это и будет уже строковое значение А)


//* Enums in runtime Все превращаются в functions. Часто enums нужны только как const-ы. Тогда можем обозначить const-вый enum
const enum ConstEnum {
  A,
  B
}

let y = ConstEnum.A

//! Never - этот type означает, что переменная никогда не примет значение
enum Lot {
  One = 1,
  Two,
  Three
}

function ruLot(lot: Lot) {
  switch(lot) {
    case Lot.One:
      return 'первый';
    case Lot.Two:
      return 'второй';
    case Lot.Three:
      return 'третий';
    default:
      const z: never = lot;
  }
}

//! Tuple (кортеж) - помогаю хранить значения разных типов в некоторм массиве При компиляции tsc получаем реальный Array.
const g: [number, string, number] = [0, 'a', 1];  //при инициализации фиксированная длина, но можно расширить методами
g.push(2); // added element, добавили элемент and lenght changed. НО обратиться к нему НЕ СМОЖЕМ, т.к. в рамках типа у нас есть определенный кортеж с определенными типами Поэтому Tuple обычно используются в качестве неизменяемых значений с точик зрения длины этого кортежа. Т.е. используем, как четко заданную структуру.
g.map(el => {
  switch(typeof el) {
    case 'string':
      
      break;
  }
})
//* Деструктурировать Tuple можем также, как обычные массивы

const [h, i, k,] = g;
// or use rest operator
const [h1, ...res] = g;

//! Generics - один из инструментов для переиспользования кода. Позволяют использовать functions or objects для разных типов данных

function logTime(num: number): number {
  console.log(new Date());
  return num;
}
// это уже дублирование кода...
function logTime1(num: string): string {
  console.log(new Date());
  return num;
}

// поэтому используем Generics
function logTime2<T>(num: T): T {
  console.log(new Date());
  return num;
}
logTime2<string>('dfgdfgdf')
logTime2<number>(7)


function logTime3<T>(num: T): T {
  if (typeof num === 'number') {
    num.toFixed();  // именно для types number
  }
  return num;
}

//* Ещё Generics можно использовать и для описания interfaces

interface MyInterface {
  transform: (a: number) => number;
}
// ф-цию выше хотим сделать универсальной:
interface MyInterface1 {
  transform1:<T> (a: T) => T;
}

// а так преобразуем, когда на входе один тип, а на выходе другой:
interface MyInterface2 {
  transform2:<T, F> (a: T) => F;
}

//* Generics можно использовать и class
class GenericClass<T> {
  value: T
}
const aa = new GenericClass<string>
aa.value // aa type string

//* Также Generics, как и други типы, может extend-ить что-то
interface TimeStamp {
  stamp: number;
}

function logTimeStamp<T extends TimeStamp>(num: T): T {
  console.log(num.stamp)
  return num;
}

//!   JSX
//? Для того, чтобы использовать JSX, нужны некоторые приготовления:
//? - расширения файлов должны быть .tsx  либо  .jsx
//? - также нужно скорректировать tsconfig.json  -> раскомментить и установить ->  "jsx": "react",   
//? - нужно установить бибилиотеку React, которая добавить недостающую типизацию:
//* npm i react
//* npm i -D @types/react
//? и в самом файле: 
//* import React from "react;