# 2623. Memoize

Given a function `fn`, return a **memoized** version of that function.  

A **memoized** function is a function that will never be called twice with the same inputs. Instead it will return a cached value.  

You can assume there are **3** possible input functions: sum, fib, and factorial.  

- `sum` accepts two integers `a` and `b` and returns `a + b`. Assume that if a value has already been cached for the arguments `(b, a)` where `a != b`, it cannot be used for the arguments `(a, b)`. For example, if the arguments are `(3, 2)` and `(2, 3)`, two separate calls should be made. 

- `fib` accepts a single integer n and returns `1` if `n <= 1` or `fib(n - 1) + fib(n - 2)` otherwise.  

- `factorial` accepts a single integer `n` and returns `1` if `n <= 1` or `factorial(n - 1) * n` otherwise.  

<br>

**Example 1:**

> **Input:**  
> fnName = "sum"  
> actions = ["call","call","getCallCount","call","getCallCount"]  
> values = [[2,2],[2,2],[],[1,2],[]]  
> **Output:** [4,4,1,3,2]  
> **Explanation:**  
> const sum = (a, b) => a + b;  
> const memoizedSum = memoize(sum);  
> memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.  
> memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.  
> // "getCallCount" - total call count: 1  
> memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.  
> // "getCallCount" - total call count: 2  

<br>

**Example 2:**

> **Input:**  
> fnName = "factorial"  
> actions = ["call","call","call","getCallCount","call","getCallCount"]  
> values = [[2],[3],[2],[],[3],[]]  
> **Output:** [2,6,2,2,6,2]  
> **Explanation:**  
> const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));  
> const memoFactorial = memoize(factorial);  
> memoFactorial(2); // "call" - returns 2.  
> memoFactorial(3); // "call" - returns 6.  
> memoFactorial(2); // "call" - returns 2. However factorial was not called because 2 was seen before.  
> // "getCallCount" - total call count: 2  
> memoFactorial(3); // "call" - returns 6. However factorial was not called because 3 was seen before.  
> // "getCallCount" - total call count: 2  

<br>

**Example 3:**

> **Input:**  
> fnName = "fib"  
> actions = ["call","getCallCount"]  
> values = [[5],[]]  
> **Output:** [8,1]  
> **Explanation:**   
> fib(5) = 8 // "call"  
> // "getCallCount" - total call count: 1  

<br>

**Constraints:**

- `0 <= a, b <= 105`  

- `1 <= n <= 10`  

- `1 <= actions.length <= 10^5`  

- `actions.length === values.length`  

- `actions[i]` is one of "call" and "getCallCount"  

- `fnName` is one of "sum", "factorial" and "fib"  

<br>

# Anotações

Questão envolve o conceito de **caching** e **memoização** 

Javascript tem um método `toString()`.

---

- args = `[2,3]`   
- ...args = `2,3`

Arrays são objetos e objetos possuem uma referência para o valor armazenado.

Diferentes objetos podem ter o mesmo valor armazenado, mas as referências nunca serão iguais, por exemplo: `Array01234` e `Array24680` apontam para diferentes locais na memória.  

Quando compararamos arrays com o operador `===`, checamos se as referências são iguais e não se os valores armazenados são os mesmos.  

`Array01234 = "teste"`  
`Array24680 = "teste"`  

`Array01234 === Array24680` é falso  
`"teste" = "teste"` é verdadeiro  

---

<br>

### Outras soluções

```js
function memoize(fn) {
    let calls = [];
    let results = [];

    return function(...args) {
        for (let i = 0; i < calls.length; i++) {
            if (JSON.stringify(calls[i]) === JSON.stringify(args)) {
                return results[i];
            }
        }
        calls.push([...args]);
        results.push(fn(...args));
        return results[results.length - 1];
    };
};
```

A primeira solução que passou nos testes iniciais. Porém não passou em um teste gigante e excedia o limite de tempo, então eu coloquei outra.

<br>

```js
function memoize(fn) {
    
   const cache = {};
  
   return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }
    
    const result = fn.apply(this, args);
    cache[key] = result;
    
    return result;
  }
  
}
```

Usando closures e um objeto para armazenar o cache.  

Os argumentos passados seriam as `keys` e os resultados da função usando os argumentos passados seriam os `values`.

this preserva o contexto no qual está sendo chamado.  
`fn.apply(this, args)` poderia ser substituído por `fn(...args)`.

Utiliza-se `key in cache` em vez de `cache[key]`, porque se key fosse um valor falsy, como `[0,0]` para `sum()`, a condição não seria atendida, sendo que poderia ter sido atendida. (comportamento inesperado)

<br>

```js
function memoize(fn) {

    let callCounter = 0;
    const cache = {};
  
    return function(...args) {
        const key = JSON.stringify(args);
    
        if (! (key in cache)) {
            cache[key] = fn(...args);
            callCounter += 1;
        };

    return cache[key];
    };
};
```

Aplica boas práticas.  
`callCounter` não é necessário, mas é uma boa prática no mundo real.

<br>

```js
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }
}
```

Usando `Map`.

<br>

```js
function memoize(fn) {
  fn.cache = {};

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in fn.cache) {
      return fn.cache[key];
    }

    const result = fn(...args);
    fn.cache[key] = result;
    return result;
  }
}
```

Usando propriedades da função.