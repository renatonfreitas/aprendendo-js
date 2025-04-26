# 2704. To Be Or Not To Be

Write a function `expect` that helps developers test their code. It should take in any value `val` and return an object with the following two functions.

- `toBe(val)` accepts another value and returns `true` if the two values `===` each other. If they are not equal, it should throw an error `"Not Equal"`.   
- `notToBe(val)` accepts another value and returns `true` if the two values `!==` each other. If they are equal, it should throw an error `"Equal"`.

<br> 

Example 1:

> **Input:** func = () => expect(5).toBe(5)  
> **Output:** {"value": true}  
> **Explanation:** 5 === 5 so this expression returns true.  

Example 2:

> **Input:** func = () => expect(5).toBe(null)  
> **Output:** {"error": "Not Equal"}  
> **Explanation:** 5 !== null so this expression throw the error "Not Equal".  

Example 3:

> **Input:** func = () => expect(5).notToBe(null)  
> **Output:** {"value": true}  
> **Explanation:** 5 !== null so this expression returns true.

<br>

# Anotações  

### Como criar um objeto

Método 1 (sintaxe literal)

```js
let object = {

    method1: function(arg1) {
        // some code
    },

    method2: function(arg2) {
        // some code
    }
};

return object;
```

<br>

Método 2

```js
let object = new Object();

object.method1 = function(arg) {
    // some code
}

object.method2 = function(arg) {
    // some code
}

return object;
```

<br>

### Como criar uma função

Método 1

```js
functionNameOne: function(arg) => {
    // do something... return something...
}
```

<br>

Método 2

```js
functionNameOne(arg) {
    // do something... return something... 
}
```

<br>

Método 3

```js
functionNameOne: (arg) => returnValue
```

<br>

### Como lançar um erro

```js
throw new Error("message");
```

<br>

### Outra solução

```js
var expect = function(val) {
    return {
        toBe: (val2) => { // arrow function
            if (val !== val2) throw new Error("Not Equal");
            return true;
        },
        notToBe: (val2) => { // arrow function
            if (val === val2) throw new Error("Equal");
            return true;
        }
    }
};
```

<br>

O que acontece aqui é que a sintaxe literal do objeto está sendo utilizada para criar um objeto com duas funções **(Como criar um objeto: Método 1)**, então está retornando um objeto diretamente.  

Você pode criar um objeto usando a sintaxe literal do objeto. Exemplo:  

```js
const pessoa = {
    nome: 'alfa',
    sobrenome: 'beta',
    eat: function() {}
}
```