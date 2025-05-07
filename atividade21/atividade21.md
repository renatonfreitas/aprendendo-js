# 2677. Chunk Array

Given an array `arr` and a chunk size `size`, return a **chunked** array.  

A **chunked** array contains the original elements in `arr`, but consists of subarrays each of length `size`. The length of the last subarray may be less than `size` if `arr.length` is not evenly divisible by `size`.  

You may assume the array is the output of `JSON.parse`. In other words, it is valid JSON.  

Please solve it without using lodash's `_.chunk` function.  

<br>

**Example 1:**

> **Input:** arr = [1,2,3,4,5], size = 1  
> **Output:** [[1],[2],[3],[4],[5]]  
> **Explanation:** The arr has been split into subarrays each with 1 element.  

<br>

**Example 2:**

> **Input:** arr = [1,9,6,3,2], size = 3  
> **Output:** [[1,9,6],[3,2]]  
> **Explanation:** The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.  

<br>

**Example 3:**

> **Input:** arr = [8,5,3,2,6], size = 6  
> **Output:** [[8,5,3,2,6]]  
> **Explanation:** Size is greater than arr.length thus all elements are in the first subarray.  

<br>

**Example 4:**

> **Input:** arr = [], size = 1  
> **Output:** []  
> **Explanation:** There are no elements to be chunked so an empty array is returned.  

<br>

**Constraints:**

- `arr` is a valid JSON array
- `2 <= JSON.stringify(arr).length <= 10^5`
- `1 <= size <= arr.length + 1`

<br>

# Anotações

Surgiu dentro de mim o interesse em **criar uma linguagem de programação**, para aprender a implementar as funções tradicionais - como o `slice()` desse exercício. Será ótimo para treinar minha lógica e aumentar o meu entendimento sobre a computação e a complexidade de algoritmos.

Acho que se eu colocasse `end` fora do loop `while` economizaria espaço, porque criaria apenas uma variável, enquanto que da forma como está escrita, cria a variável várias vezes e isso deve consumir desnecessariamente memória.

Dá para otimizar o código substituindo as variáveis por seus valores e até diminuindo o número destas.

### Outras soluções

```js
const result = [];
for(let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
}
return result;
```

<br>

```js
const chunk = (arr, size) => {
  return arr.reduce((chunkedArray, element) => {
    const lastChunk = chunkedArray[chunkedArray.length - 1];
    if (!lastChunk || lastChunk.length === size) {
      chunkedArray.push([element]);
    } else {
      lastChunk.push(element);
    }
    return chunkedArray;
  }, []);
};
```