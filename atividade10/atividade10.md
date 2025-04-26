# 2666. Allow One Function Call

Given a function `fn`, return a new function that is identical to the original function except that it ensures `fn` is called at most once.  

- The first time the returned function is called, it should return the same result as `fn`.  
- Every subsequent time it is called, it should return `undefined`.  

<br>

**Example 1:**

> **Input:** fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]  
> **Output:** [{"calls":1,"value":6}]  
> **Explanation:**  
> const onceFn = once(fn);  
> onceFn(1, 2, 3); // 6  
> onceFn(2, 3, 6); // undefined, fn was not called  

<br>

**Example 2:**

> **Input:** fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]]  
> **Output:** [{"calls":1,"value":140}]  
> **Explanation:**  
> const onceFn = once(fn);  
> onceFn(5, 7, 4); // 140  
> onceFn(2, 3, 6); // undefined, fn was not called  
> onceFn(4, 6, 8); // undefined, fn was not called  
 
<br>

**Constraints:**

- `calls` is a valid JSON array  
- `1 <= calls.length <= 10`  
- `1 <= calls[i].length <= 100`  
- `2 <= JSON.stringify(calls).length <= 1000`  

<br>

# Anotações

Não é necessário retornar `undefined`, porque quando não tem um `return`, o javascript retorna `undefined` automaticamente. Mas para tornar a legibilidade e a compreensão do código melhor, coloquei o `return undefined`.  

### Outras soluções

```js
function once(fn) {
  let hasBeenCalled = false;
  let result;

  return (...args) => {
    if (!hasBeenCalled) {
      result = fn(...args);
      hasBeenCalled = true;
      return result;
    } else {
      return undefined;
    }
  };
}
```

Garante que a função retorne o mesmo valor a cada vez que for chamada.

<br>

```js
class Once {
  hasBeenCalled = false;
  result;

  call(fn, ...args) {
    if (!this.hasBeenCalled) {
      this.result = fn(...args);
      this.hasBeenCalled = true;
      return this.result;
    } else {
      return undefined;
    }
  }
}

function once(fn) {
  const instance = new Once();
  return instance.call.bind(instance, fn);
}
```

`bind` cria uma nova função que quando chamada, chama a função (`fn`) com o `this` aplicado ao valor passado (`instance`).

<br>

```js
function once(fn) {
  return function(...args) {
    const state = {
      hasBeenCalled: false,
      result: undefined
    };

    if (!state.hasBeenCalled) {
      state.result = fn(...args);
      state.hasBeenCalled = true;
      return state.result;
    } else {
      return undefined;
    }
  };
}
```

<br>

```js
const once = (fn) => {
    let isExecuted = false;
    return (...args) => (isExecuted ? undefined : ((isExecuted = true), fn(...args)));
};
```

Se `isExecuted` for `true`, retorna `undefined`. Se for `false`, `isExecuted` recebe `true` e executa `fn` com os argumentos fornecidos e retorna seu resultado.