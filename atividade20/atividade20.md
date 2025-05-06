# 2727. Is Object Empty

Given an object or an array, return if it is empty.

- An empty object contains no key-value pairs.  
- An empty array contains no elements.  

You may assume the object or array is the output of `JSON.parse`.  

<br>

**Example 1:**

> **Input:** obj = {"x": 5, "y": 42}  
> **Output:** false  
> **Explanation:** The object has 2 key-value pairs so it is not empty.  

<br>

**Example 2:**

> **Input:** obj = {}  
> **Output:** true  
> **Explanation:** The object doesn't have any key-value pairs so it is empty.  

<br>

**Example 3:**

> **Input:** obj = [null, false, 0]  
> **Output:** false  
> **Explanation:** The array has 3 elements so it is not empty.  
 
<br>

**Constraints:**

- `obj` is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10^5`

<br>

**Can you solve it in O(1) time?**

<br>

# Anotações

Arrays são objetos. O índice seria as chaves (`keys`) do array e os valores em cada índice seriam os valores acessados (`values`).  
`Object.keys` fornece as chaves de um objeto ou os índices de um array em um array.  

### Outras soluções

```js
var isEmpty = function(obj) {
    if (JSON.stringify(obj).length <= 2) return true
    else return false
};
```

`JSON.stringify()` retorna uma string representando o objeto. Se o objeto for vazio, o retorno será uma string `{}` e se não for vazia terá os `key`-`values` dentro, portanto verificar se a string retornada tem um tamanho de dois caracteres é uma forma alternativa de indicar que o objeto analisado é vazio.  

<br>

```js
var isEmpty = function(obj) {
    for (const _ in obj) return false;
    return true;
};
```

Se o objeto não for vazio, o código executa a repetição e logo na primeira iteração retorna `false`. Se o objeto for vazio, ele pula a repetição e retona `true`.

<br>

```js
var isEmpty = function(obj) {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).length === 0;
    }
   
    return true;
};
```