# 2721. Execute Asynchronous Functions in Parallel

Given an array of asynchronous functions `functions`, return a new promise `promise`. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.  

`promise` resolves:

- When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.  

`promise` rejects:

- When any of the promises returned from `functions` were rejected. `promise` should also reject with the reason of the first rejection.


Please solve it without using the built-in `Promise.all` function.

<br>

**Example 1:**

> **Input:** functions = [  
> &nbsp;&nbsp;&nbsp;&nbsp;  () => new Promise(resolve => setTimeout(() => resolve(5), 200))  
> ]  
> **Output:** {"t": 200, "resolved": [5]}  
> **Explanation:**  
> promiseAll(functions).then(console.log); // [5]  
>   
> The single function was resolved at 200ms with a value of 5.  

<br>

**Example 2:**

> **Input:** functions = [  
> &nbsp;&nbsp;&nbsp;&nbsp;    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),  
> &nbsp;&nbsp;&nbsp;&nbsp;    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))  
> ]  
> **Output:** {"t": 100, "rejected": "Error"}  
> **Explanation:** Since one of the promises rejected, the returned promise also rejected with the same error at the same time.  

<br>

**Example 3:**

> **Input:** functions = [  
> &nbsp;&nbsp;&nbsp;&nbsp;    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),  
> &nbsp;&nbsp;&nbsp;&nbsp;    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),  
> &nbsp;&nbsp;&nbsp;&nbsp;    () => new Promise(resolve => setTimeout(() => resolve(16), 100))  
> ]  
> **Output:** {"t": 150, "resolved": [4, 10, 16]}  
> **Explanation:** All the promises resolved with a value. The returned promise resolved when the last promise resolved.  

<br>

**Constraints:**

- `functions` is an array of functions that returns promises
- `1 <= functions.length <= 10`

<br>

# Anotações

**Não consegui fazer a questão. Refazer no futuro!**

Cada função passada em `functions` é assíncrona, o que significa que ela retornará uma `Promise` quando chamada. Assim, podemos usar o `.then()` e o `.catch()` em seguida.

### Outras soluções

```js
var promiseAll = async function(functions) {
    return new Promise((resolve,reject) => {
        if(functions.length === 0) {
            resolve([]);
            return;
        }
        
        const res = new Array(functions.length).fill(null);

        let resolvedCount = 0;

        functions.forEach(async (el,idx) => {
            try {
                const subResult = await el();
                res[idx] = subResult;
                resolvedCount++;
                if(resolvedCount=== functions.length) {
                    resolve(res);
                }
            } catch(err) {
                reject(err);
            }
        });
    });
};
```

Usando a sintaxe do async/await.