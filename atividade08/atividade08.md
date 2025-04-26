# 2629. Function Composition

Given an array of functions `[f1, f2, f3, ..., fn]`, return a new function `fn` that is the function composition of the array of functions.

The function composition of `[f(x), g(x), h(x)]` is `fn(x) = f(g(h(x)))`.

The function composition of an empty list of functions is the identity function `f(x) = x`.

You may assume each function in the array accepts one integer as input and returns one integer as output.

<br>

**Example 1:**

> **Input:** functions = [x => x + 1, x => x * x, x => 2 * x], x = 4  
> **Output:** 65  
> **Explanation:**  
> Evaluating from right to left ...  
> Starting with x = 4.  
> 2 * (4) = 8  
> (8) * (8) = 64  
> (64) + 1 = 65  

<br>

**Example 2:**

> **Input:** functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1  
> **Output:** 1000  
> **Explanation:**  
> Evaluating from right to left ...  
> 10 * (1) = 10  
> 10 * (10) = 100  
> 10 * (100) = 1000  

<br>

**Example 3:**

> **Input:** functions = [], x = 42  
> **Output:** 42  
> **Explanation:**  
> The composition of zero functions is the identity function  
 
<br>

**Constraints:**

- `-1000 <= x <= 1000`  
- `0 <= functions.length <= 1000`  
- all functions accept and return a single integer  

<br>

# Anotações

Composição de funções é uma técnica aplicada na programação funcional.  
Composição de funções é a combinação de duas ou mais funções para formar uma nova função.  

### Outras soluções

```js
var compose = function(functions) {
    return function(x) {
        return functions.reduceRight((res, fn) =>  fn(res), x);
    };
};
```

<br>

```js
var compose = function(functions) {
    let arr = functions.reverse();
    return function(x) {
        let res = x;
        arr.forEach((fn) => {
            res = fn(res);
        });
    };
    return res;
};
```

<br>

```js
var compose = function(functions) {
    let arr = functions.reverse();
    return function(x) {
        let res = x;
        for (const fn of functions) {
            res = fn(res);
        };
        return res;
    };
};
```

<br>

```js
var compose = function(functions) {
    let arr = functions.reverse();
    return function(x) {
        if (arr.length !==0) {
            const head = arr[0];
            const tail = arr.slice(1);
            const res = head(x);
            const newArr = compose(tail.reverse());
            return newArr(res);
        }
        return x;
    };
};
```

<br>

```js
var compose = function(functions) {
    return function(x) {
        let result = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            result = functions[i](result);
        }
        return result;
    };
};
```

Forma inteligente de utilizar o loop `for`. Em vez de inverter o array, eu só começo do último elemento e vou subtraindo o index até o ponto que o index é menor que o menor index possível. 

<br>

```js
const compose = f => x => f.reduceRight((a, fn) => fn(a), x);
```

<br>

```js
const compose = f => x => {
    res = x;
    for (let i = 0; i < f.length; i++) {
        res = f.at(-1 - i)(res);
    }
    return res;
};
```

Funciona! O último elemento começa do -1, se colocar -0 vai se tornar 0 e começar do primeiro elemento do array, por isso que precisa do -1.