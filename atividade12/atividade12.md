# 2723. Add Two Promises

Given two promises **promise1** and **promise2**, return a new promise. **promise1** and **promise2** will both resolve with a number. The returned promise should resolve with the sum of the two numbers.

<br>

**Example 1:**

> **Input:**  
> promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),   
> promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))  
> **Output:** 7  
> **Explanation:** The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.  

<br>

**Example 2:**

> **Input:**   
> promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)),   
> promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))  
> **Output:** -2  
> **Explanation:** The two input promises resolve with the values of 10 and -12 respectively. The returned promise should resolve with a value of 10 + -12 = -2.  
 
<br>

**Constraints:**

- `promise1` and `promise2` are promises that resolve with a number

<br>

# Anotações

Para conseguir fazer esse exercício é necessário conhecimento em **funções assíncronas**, **callback**, **callback hell**, **promise** e muito café para tomar enquanto pesquisa e lê documentações.

### Outras soluções

```js
var addTwoPromises = async function(promise1, promise2) {
    return Promise.resolve(await promise1 + await promise2);
};
```

<br>

```js
var addTwoPromises = async function(promise1, promise2) {
    return Promise.all([promise1, promise2]).then((values) => {
        const sum = values.reduce((total, value) => total + value, 0);
        return sum;
    });
};
```

Solução que eu mais gostei e achei esperta. A minha resposta vai depender de `promise1` para executar `promise2`, enquanto que nessa solução, `Promise.all()` executa-as independentemente.  

`.then((values) => {...})` -> `values` representa os valores das Promises.  

`Promise.all()` recebe um array com um certo número de Promises e retorna apenas uma Promise com um array contendo os valores das promises resolvidas (`values`).