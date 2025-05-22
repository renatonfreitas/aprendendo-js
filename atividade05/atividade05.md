# 2635. Apply Transform Over Each Element in Array

Given an integer array `arr` and a mapping function `fn`, return a new array with a transformation applied to each element.

The returned array should be created such that `returnedArray[i] = fn(arr[i], i)`.

Please solve it without the built-in `Array.map` method.

<br> 

**Example 1:**

> **Input:** arr = [1,2,3], fn = function plusone(n) { return n + 1; }  
> **Output:** [2,3,4]  
> **Explanation:**  
> const newArray = map(arr, plusone); // [2,3,4]  
> The function increases each value in the array by one.  

<br>

**Example 2:**

> **Input:** arr = [1,2,3], fn = function plusI(n, i) { return n + i; }  
> **Output:** [1,3,5]  
> **Explanation:** The function increases each value by the index it resides in.  

<br>

**Example 3:**

> **Input:** arr = [10,20,30], fn = function constant() { return 42; }  
> **Output:** [42,42,42]  
> **Explanation:** The function always returns 42.  
 
 <br>

**Constraints:**

- `0 <= arr.length <= 1000`  
- `-10^9 <= arr[i] <= 10^9`  
- `fn` returns an integer.  

<br>

# Anotações

### Outras soluções

```js
var map = function(arr, fn) {
  let returnedArray = [];
  for (let i = 0; i < arr.length; i++) {
    returnedArray.push(fn(arr[i], i));
  };
  return transformedArr;
};
```

Quando a função que é passada como argumento em `fn` tem apenas um argumento, argumentos adicionais simplesmente são ignorados, por isso que não tem problema deixar `i` como segundo argumento na linha `returnedArray.push(fn(arr[i], i));`.

<br>

```js
var map = function(arr, fn) {
  const transformedArr = [];
  arr.forEach((element, index) => {
    transformedArr[index] = fn(element, index);
  });
  return transformedArr;
};
```

Na sintaxe do `forEach()`, pode-se passar o elemento atual, o índice do elemento (opcional) e o array que está sendo percorrido (opcional) como argumentos.

<br>

```js
var map = function(arr, fn) {
  return arr.reduce((transformedArr, element, index) => {
    transformedArr[index] = fn(element, index);
    return transformedArr;
  }, []);
};
```

É passado a função aplicada a cada elemento ( `(transformedArr, element, index) => {transformedArr[index] = fn(element, index); return transformedArr;}` ) e o valor inicial ( `[]` ) no método `reduce()`.  

O `transformedArr` é o acumulador, ou seja, a cada invocação do método `reduce()` no array original `arr`, o valor modificado pela função será adicionado no `transformedArr` e o array resultante disso será considerado o acumulador atual na próxima invocação do método.  

O `transformedArr` é um array por causa que foi passado um array vazio como segundo argumento do método `reduce()`.  

O `reduce()` faz uma única iteração no array original, aplicando uma função de transformação para cada elemento.  

O `transformedArr` é retornado várias vezes, mas o array mapeado completo é retornado só no final da ação do método `reduce()`. O `transformedArr` é retornado várias vezes para ser usado na próxima invocação do método, se ele não for retornado, ele seria considerado `undefined`, porque, em JavaScript, quando uma função não tem uma instrução `return` explícita (ou tem um `return` sem valor), ela retorna `undefined` por padrão (e lembra que o primeiro argumento do `reduce()` é uma função?) causando erro. Basicamente, o acumulador não foi atualizado na invocação passada explicitamente, então, por padrão, foi atualizado como `undefined` e não conseguimos definir propriedades de `undefined`.

Na sintaxe do `reduce()`, é passado a função aplicada e o valor inicial do acumulador (opcional). 

A função tem o acumulador, o elemento atual, o índice do elemento atual e o array que está sendo percorrido como argumentos.

Se o valor inicial do acumulador for passado, a função começa a execução com o primeiro elemento do array (índice 0) como "elemento atual". Se o valor inicial do acumulador não for passado, o acumulador é inicializado como o primeiro elemento do array e a função começa a execução com o segundo elemento do array (índice 1) como seu "elemento atual".

<br>

```js
var map = function(arr, fn) {
  const transformedArr = [];
  let index = 0;
  for (const element of arr) {
    transformedArr[index] = fn(element, index);
    index++;
  }
  return transformedArr;
};
```

<br>

```js
var map = function(arr, fn) {
     return arr.map((element, index) => fn(element, index));
};
```

Essa solução foi explicitamente probida no enunciado, só estou colocando aqui para fins de conhecimento.  

`Array.map` não modifica o array original, uma vez que cria e retorna um novo array automaticamente.  

Na sintaxe do `Array.map()`, pode-se passar o elemento atual, o índice do elemento (opcional) e o array que está sendo percorrido (opcional) como argumentos a serem usados na função aplicada a cada elemento do array.