# 2621. Sleep

Given a positive integer `millis`, write an asynchronous function that sleeps for `millis` milliseconds. It can resolve any value.

**Note** that minor deviation from `millis` in the actual sleep duration is acceptable.

<br>

**Example 1:**

> **Input:** millis = 100  
> **Output:** 100  
> **Explanation:** It should return a promise that resolves after 100ms.  
> let t = Date.now();  
> sleep(100).then(() => {  
>   console.log(Date.now() - t); // 100  
> });  

<br>

**Example 2:**

> **Input:** millis = 200  
> **Output:** 200  
> **Explanation:** It should return a promise that resolves after 200ms.  

<br>

**Constraints:**

- `1 <= millis <= 1000`  

<br>

# Anotações

Quando criamos uma `Promise` passamos uma função executora que possui dois parâmetros: "`resolve`" e "`reject`". Eses parâmetros controlam o resultado da `Promise`, então quando invocamos `resolve` a `Promise` torna-se resolvida e o valor dela pode ser acessada pela primeira função passada como argumento dentro do bloco/método `.then`.  

`() => { resolve() }` é equivalente a `resolve`

### Outras soluções

```js
async function sleep(millis) {
    await new Promise(resolve => setTimeout(resolve, millis));
}
```

Nesse exercício qualquer valor pode ser resolvido. Dentro do timeout estamos invocando `resolve` sem argumentos, o que retorna `undefined` e sem a declaração de `return` uma função retorna `undefined` por padrão, por isso que nesse caso não tem o `retun`. O `await` é para garantir que será retornado após a `Promise` ter sido resolvida.

<br>

```js
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
```