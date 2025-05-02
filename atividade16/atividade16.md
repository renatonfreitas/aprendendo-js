# 2637. Promise Time Limit

Given an asynchronous function `fn` and a time `t` in milliseconds, return a new time limited version of the input function. `fn` takes arguments provided to the time limited function.

The **time limited** function should follow these rules:

- If the `fn` completes within the time limit of `t` milliseconds, the time limited function should resolve with the result.

- If the execution of the `fn` exceeds the time limit, the time limited function should reject with the string `"Time Limit Exceeded"`.

<br>

**Example 1:**

> **Input:**   
> ```
> fn = async (n) => {   
>   await new Promise(res => setTimeout(res, 100));   
>   return n * n;   
> }  
> ```
> inputs = [5]  
> t = 50  
> **Output:** {"rejected":"Time Limit Exceeded","time":50}  
> **Explanation:**  
> ```
> const limited = timeLimit(fn, t)  
> const start = performance.now()  
> let result;  
> try {  
>    const res = await limited(...inputs)  
>    result = {"resolved": res, "time": Math.floor(performance.now() - start)};  
> } catch (err) {  
>    result = {"rejected": err, "time": Math.floor(performance.now() - start)};  
> }  
> console.log(result) // Output  
> ```   
>
> The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.  

<br>

**Example 2:**

> **Input:**   
> ```
> fn = async (n) => {   
>   await new Promise(res => setTimeout(res, 100));   
>   return n * n;   
> }  
> ```
> inputs = [5]  
> t = 150  
> **Output:** {"resolved":25,"time":100}  
> **Explanation:**  
> The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.  

<br>

**Example 3:**

> **Input:**   
> ```
> fn = async (a, b) => {   
>   await new Promise(res => setTimeout(res, 120));   
>   return a + b;   
> }  
> ```
> inputs = [5,10]  
> t = 150  
> **Output:** {"resolved":15,"time":120}  
> **Explanation:**  
> ​​The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.  

<br>

**Example 4:**

> **Input:**  
> ``` 
> fn = async () => {   
>   throw "Error";  
> }  
> ```
> inputs = []  
> t = 1000  
> **Output:** {"rejected":"Error","time":0}  
> **Explanation:**  
> The function immediately throws an error.  

<br>

**Constraints:**

- `0 <= inputs.length <= 10`
- `0 <= t <= 1000`
- `fn` returns a promise

<br>

# Anotações

Nós definimos o `reject` e a sua mensagem dentro de timeout. A primeira coisa que acontece é que o timer começa a correr, mas como possui um comportamento assíncrono, o código passa para a próxima instrução. Se a função for executada antes que o timer zere, a `Promise` é resolvida, caso o timer acabe antes, a `Promise` é rejeitada com a mensagem de limite de tempo excedido e se a função der erro/ lançar uma exceção, o código pega esse erro e rejeita a `Promise` sem uma mensagem definida.

A função original pode lançar uma exceção e se não for tratada, teremos o erro da função original e o erro do `setTimeout` e isso dificuta o debug.

### Outras soluções

```js
var timeLimit = function(fn, t) {

    return async function(...args) {

        const promise = [
            new Promise(resolve => resolve(fn(...args))), // Promise that resolves with the result of executing fn(...args)
            new Promise((resolve, reject) => setTimeout(() => reject('Time Limit Exceeded'), t)) //Promise that rejects with 'Time Limit Exceeded' after t milliseconds
        ] 

    // Return a new promise that resolves or rejects as soon as one of the promises in the array settles
    return Promise.race(promise);
    }
}
```

<br>

```js
var timeLimit = (fn, t) => async (...args) =>
  Promise.race([
    fn(...args),
    new Promise((_, reject) =>
      setTimeout(() => reject("Time Limit Exceeded"), t)
    )
  ]);
```

É a mesma solução que a de cima, mas escrita de uma forma diferente.

`Promise.resolve()` retorna o resultado da operação passada como argumento, então chamar a função diretamente aqui resultaria no mesmo, uma vez que `Promise.resove()` seria uma espécie de wrapping para usar no contexto de funçõse assíncronas. O que eu quero dizer é que chamar a função diretamente ou passar a função para dentro de `Promise.resolve()` vai dar o mesmo resutado.

<br>

```js
var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            let timerId;

            fn(...args)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                }).finally(() => {
                    clearTimeout(timerId);
                });

            timerId = setTimeout(() => {
                reject('Time Limit Exceeded');
            }, t);
        });
    };
};
```

Previne vazamento de memória

<br>

```js
var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject("Time Limit Exceeded"), t);
            fn(...args).then(resolve, reject);
        });
    }
};
```