# 2631. Group By

Write code that enhances all arrays such that you can call the `array.groupBy(fn)` method on any array and it will return a **grouped** version of the array.

A **grouped** array is an object where each key is the output of `fn(arr[i])` and each value is an array containing all items in the original array which generate that key.

The provided callback `fn` will accept an item in the array and return a string key.

The order of each value list should be the order the items appear in the array. Any order of keys is acceptable.

Please solve it without lodash's `_.groupBy` function.

<br>

**Example 1:**

> **Input:**  
> array = [  
>   {"id":"1"},  
>   {"id":"1"},  
>   {"id":"2"}  
> ],  
> fn = function (item) {  
>   return item.id;  
> }  
> **Output:**  
> {  
>   "1": [{"id": "1"}, {"id": "1"}],  
>   "2": [{"id": "2"}]  
> }  
> **Explanation:**  
> Output is from array.groupBy(fn).  
> The selector function gets the "id" out of each item in the array.  
> There are two objects with an "id" of 1. Both of those objects are put in the first array.  
> There is one object with an "id" of 2. That object is put in the second array.  

<br>

**Example 2:**

> **Input:**  
> array = [  
>   [1, 2, 3],  
>   [1, 3, 5],  
>   [1, 5, 9]  
> ]  
> fn = function (list) {  
>   return String(list[0]);  
> }
> **Output:**  
> {  
>   "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]  
> }  
> **Explanation:**  
> The array can be of any type. In this case, the selector function defines the key as being the first element in the array.  
> All the arrays have 1 as their first element so they are grouped together.  
> {  
>   "1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]  
> }  

<br>

**Example 3:**

> **Input:**  
> array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  
> fn = function (n) {  
>   return String(n > 5);  
> }  
> **Output:**  
> {  
>   "true": [6, 7, 8, 9, 10], 
>   "false": [1, 2, 3, 4, 5]  
> }  
> **Explanation:**  
> The selector function splits the array by whether each number is greater than 5.  

<br>

**Constraints:**

- `0 <= array.length <= 10^5`  
- `fn` returns a string  

<br>

# Anotações

### Outras soluções

```js
/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    group = {}
    for(let i=0; i<this.length; i++){
        let key = fn(this[i]);
        let arr = group[key];

        if(!arr){
            arr = []  
            group[key] = arr;  // group[key] points to arr   
        }
        
        arr.push(this[i])  // hence pushing to arr works or you can also push to group[key] .
    }
    return group;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
```

`arr` pega o array da chave que foi calculada nessa iteração. Se a chave já existir, o código só irá adicionar o elemento atual ao array da chave, agora, se a chave não existir `arr` será `undefined` e a condição do `if` será atendida, então criará um array e adicionará, no objeto que será retornado, a chave e o elemento atual como seu valor (array).  

Esse raciocínio é melhor do que se criar um array vazio no início e verificar se existe um array para chave atual, porque assim o código estaria às cegas. Se validar a existência do array logo no início, não é preciso o `else`.

<br>

```js
/**
 * @param {Function} fn
 * @return {Array}
 */
Array.prototype.groupBy = function(fn) {
  // Reduce the array into a single object
  return this.reduce((grouped, item) => {
    // Apply the provided callback function to get the key
    const key = fn(item);
    
    // If the key doesn't exist in the grouped object, create a new array for it
    if (!grouped[key]) {
      grouped[key] = [];
    }
    
    // Push the current item to the array associated with the key
    grouped[key].push(item);
    
    // Return the updated grouped object for the next iteration
    return grouped;
  }, {});
};


/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
```

Essa solução é elegantíssima!  
Eu preciso lembrar que se a questão envolve iteração, `reduce()` é uma opção a ser considerada!  
Diferente da solução acima, esta não declara `arr`, então economiza espaço na memória.