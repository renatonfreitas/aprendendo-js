# 2634. Filter Elements from Array

Given an integer array `arr` and a filtering function `fn`, return a filtered array `filteredArr`.

The `fn` function takes one or two arguments:

- `arr[i]` - number from the arr  
- `i` - index of `arr[i]`  

`filteredArr` should only contain the elements from the `arr` for which the expression `fn(arr[i], i)` evaluates to a truthy value. A truthy value is a value where `Boolean(value)` returns `true`.  

Please solve it without the built-in `Array.filter` method.

 <br>

**Example 1:**

> **Input:** arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }  
> **Output:** [20,30]  
> **Explanation:**  
> const newArray = filter(arr, fn); // [20, 30]  
> The function filters out values that are not greater than 10  

<br>

**Example 2:**

> **Input:** arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }  
> **Output:** [1]  
> **Explanation:**  
> fn can also accept the index of each element  
> In this case, the function removes elements not at index 0  

<br>

**Example 3:**

> **Input:** arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }  
> **Output:** [-2,0,1,2]  
> **Explanation:**  
> Falsey values such as 0 should be filtered out  
 
 <br>

**Constraints:**

- `0 <= arr.length <= 1000`
- `-10^9 <= arr[i] <= 10^9`  

<br>

# Anotações

A função `filter` filtra o array removendo os valores que não atendem o critério estabelecido. O array retornado contém os valores originais que atendem ao critério.  

O seguintes valores são considerados falsy:  

- false
- 0
- -0
- 0n (BigInt zero)
- '' (string vazia)
- null
- undefined
- Nan

Todos os outros valores são considerados thruthy, incluindo:  

- '0' (string contendo um único zero)  
- 'false' (string contendo a palavra false)  
- [] (array vazio)  
- {} (objeto vazio)  
- function() {} (função vazia)  

<br>

### Outras soluções

```js
var filter = function(arr, fn) {
  return arr.reduce((result, value, index) => {
    if (fn(value, index)) {
      result.push(value);
    }
    return result;
  }, []);
};
```

<br>

```js
var filter = function(arr, fn) {
  const result = [];
  arr.forEach((value, index) => {
    if (fn(value, index)) {
      result.push(value);
    }
  });
  return result;
};
```

<br>

```js
var filter = function(arr, fn) {
  return arr.map((value, index) => {
    if (fn(value, index)) {
      return value;
    }
  }).reduce((result, value) => {
    if (value !== undefined) {
      result.push(value);
    }
    return result;
  }, []);
};
```

O método `map()` cria um novo array e adiciona nele os elementos retornados a cada iteração método. Se um elemento não for retornado, o método retornará `undefined` para aquela posição no novo array.  

Como nem todos os elementos do array original podem satisfazer o critério estabelecido, o novo array pode ter vários elementos `undefined`.  

<br>

```js
var filter = function(arr, fn) {
    return arr.flatMap((i, j) => fn(i, j) ? [i] : []);
};
```

O método `flatMap()` aplica uma função para cada elemento de um array e nivela/achata o resultado em um novo array.  

Nesse caso, a função passada para o `flatMap()` recebe dois argumentos, o elemento atual `i` e seu índice `j`, e usa um **operador ternário** para checar se `fn(i, j)` é thruthy. 
Se sim, a função retorna um array contendo `i`, caso contrário retorna um array vazio.

O método `flatMap()` nivela/achata esses arrays em um novo array contendo apenas os elementos que satisfazem a filtragem da função. Os arrays vazios são removidos completamente.  

Os valores retornados devem ser arrays para o funcionamento correto e esperado do método.

O método `flatMap()` combina os métodos `map()` e `flat()` em uma única operação.

<br>

```js
var filter = function(arr, fn) {
    var Narr=[];
    for (key in arr) {
        if(fn(arr[key], Number(key))) {
            Narr.push(arr[key]);
        }
    }
    return Narr;
};
```