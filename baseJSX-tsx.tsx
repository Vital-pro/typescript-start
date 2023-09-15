//!   JSX
//? Для того, чтобы использовать JSX, нужны некоторые приготовления:
//? - расширения файлов должны быть .tsx  либо  .jsx
//? - также нужно скорректировать tsconfig.json  -> раскомментить и установить ->  "jsx": "react",   
//? - нужно установить бибилиотеку React, которая добавить недостающую типизацию:
//* npm i react
//* npm i -D @types/react
//? и в самом файле: 
//* import React from "react;

import React from 'react';


const a: JSX.Element = <div>a</div>  //? Так мы объявили один JSX element:

//? JSX elements можно объединять друг в друга
const b: JSX.Element = <div>
  <span>
    a
  </span>
</div>;

//? Если внутри синтаксиса мы хотим использовать js или ts выражения, мы должны поставить {} скобки
const b1: JSX.Element = <div>
  <span>
    {2 * 3}
  </span>
</div>;

//? Также мы можем использовать и свойства
const b11: JSX.Element = <div tabIndex={0}>
  <span>
    {2 * 3}
  </span>
</div>;

//! Важно понять, что здесь JSX, а не HTML, это Object!! То есть:
<div tabIndex={0}></div> //* так в JSX в скобках внутри находится js или ts код
<div tabIndex='0'></div> //* так в ковычках именно в HTML

// const c = <string>b; //* так нельзя! потому что скобки <> означают, что это JSX объект
const c = b as string; //* так можно преобразовать один объект в другой