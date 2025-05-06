# 2667. Create Hello World Function

Write a function createHelloWorld. It should return a new function that always returns "Hello World".

Example 1:

> **Input:** args = []  
> **Output:** "Hello World"  
> **Explanation:**  
> const f = createHelloWorld();  
> f(); // "Hello World"
>
> The function returned by createHelloWorld should always return "Hello World".

Example 2:

> **Input:** args = [{}, null, 42]  
> **Output:** "Hello World"  
> **Explanation:**  
> const f = createHelloWorld();  
> f( {}, null, 42); // "Hello World"
>
> Any arguments could be passed to this function but it should stil always return "Hello World".

**Constraints:**

- 0 <= args.length <= 10  
<br>

# Anotações
<br>

**Sintaxe de função**

```js
function f(a,b) { // declara a função f com os argumentos a, b
    const sum = a + b; // lógica da função
    return sum; // retorna o resultado da lógica
}
console.log(f(3,4)); // 7
```

Ao NÃO retornar algo, o retorno implicitamente será `undefinied`.  
<br>

**Função anônima**

```js
var f = function(a,b) { // declara uma função anônima
    const sum = a + b;
    return sum;
}
console.log(f(3,4)); // 7
```
<br>

**Funções imediatas (Immediately Invoked Function Expression - IIFE)**

```js
const result = (function(a,b) { // declara uma constante result que invoca imediatamente a função que acabou de criar
    const sum = a + b;
    return sum;
})(3,4) // passa os argumentos para a função que acabou de criar
console.log(result); // 7
```

**Encapsula** uma variável dentro de um novo **escopo**.  
`Sum` não pode ser usado fora do corpo da função.  
<br>

**Funções dentro de funções**

```js
function createFunction() {
    function f(a,b) {
        const sum = a + b;
        return sum;
    }
    return f;
}
const f = createFunction();
console.log(f(3,4)); // 7
```
<br>

**Hoisting**

```js
function createFunction() {
    return f; // a função é usada antes de ser inicializada
    function f(a,b) {
        const sum = a + b;
        return sum;
    }
}
const f = createFunction();
console.log(f(3,4)); // 7
```  

Só é possível fazer isso se declarar funções com a sintaxe `function`.  
Má prática, porque pode reduzir a legibilidade.  
<br>

**Closures**

```js
function createAdder(a) { // serve como uma fábrica de novas funções, com cada função retornada tendo diferentes comportamentos
    function f(b) { // declara uma função que pode acessar o argumento passado na função mãe 
        const sum = a + b;
        return sum;
    }
    return f;
}
const f = createAdder(3);
console.log(f(4)); // 7
```

A combinação da função e do ambiente lexical (variáveis declaradas na função mais externa) é chamado **closure**.  
<br>

**Arrow Syntax**

```js
const f = (a,b) => { // outra forma de declarar uma função; declara uma função f com os argumentos a, b  
    const sum = a + b;
    return sum;
};
console.log(f(3,4)); // 7

```  
<br>

**Omitir o retorno**

```js
const f = (a,b) => a + b; // se você conseguir escrever a lógica da função em uma linha, você pode omitir o return
console.log(f(3,4)); // 7
```  
<br>

**Rest Arguments**

```js
function f(...args) { // declara uma função que recebe indeterminados números de argumentos como um array
    const sum = args[0] + args[1];
    return sum;
}
console.log(f(3,4)); // 7
```  
<br>

```js
/**
 * cria uma função de fábrica genérica que aceita qualquer função como input e retorna uma nova versão da função com algumas modificações específicas.
 */
function log(inputFunction) { // declara uma função que aceita e/ou retorna uma função: funções de ordem superior (higher-order functions)
    return function(...args) {
        console.log("Input", args);
        const result = inputFunction(...args);
        console.log("Output", result);
        return result;
    }
}
const f = log((a, b) => a + b);
f(1, 2); // Logs: Input [1, 2] Output 3
```