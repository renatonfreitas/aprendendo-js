# 2626. Array Reduce Transformation

Given an integer array `nums`, a reducer function `fn`, and an initial value `init`, return the final result obtained by executing the `fn` function on each element of the array, sequentially, passing in the return value from the calculation on the preceding element.

This result is achieved through the following operations: `val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ...` until every element in the array has been processed. The ultimate value of `val` is then returned.

If the length of the array is 0, the function should return `init`.

Please solve it without using the built-in `Array.reduce` method.

<br>

**Example 1:**

> **Input:** 
> nums = [1,2,3,4]  
> fn = function sum(accum, curr) { return accum + curr; }  
> init = 0  
> **Output:** 10  
> **Explanation:**  
> initially, the value is init=0.  
> (0) + nums[0] = 1  
> (1) + nums[1] = 3  
> (3) + nums[2] = 6  
> (6) + nums[3] = 10  
> The final answer is 10.  

<br>

**Example 2:**

> **Input:**  
> nums = [1,2,3,4]  
> fn = function sum(accum, curr) { return accum + curr * curr; }  
> init = 100  
> **Output:** 130  
> **Explanation:**  
> initially, the value is init=100.  
> (100) + nums[0] * nums[0] = 101  
> (101) + nums[1] * nums[1] = 105  
> (105) + nums[2] * nums[2] = 114  
> (114) + nums[3] * nums[3] = 130  
> The final answer is 130.  

<br>

**Example 3:**

> **Input:**  
> nums = []  
> fn = function sum(accum, curr) { return 0; }  
> init = 25  
> **Output:** 25  
> **Explanation:** For empty arrays, the answer is always init.  

<br>

**Constraints:**

- `0 <= nums.length <= 1000`  
- `0 <= nums[i] <= 1000`  
- `0 <= init <= 1000`  

<br>

# Anotações

### Outras soluções

```js
var reduce = function(nums, fn, init) {
    let val = init;
    nums.forEach((element) => {
        val = fn(val, element);
    });
    return val;
};
```

Mesmo que o array seja vazio, `val` retornará `init`, porque foi atribuido a ele no começo da função e será retornado após o `forEach` não ter sido realizado.  

<br>

```js
var reduce = function(nums, fn, init) {
    if (nums.length > 0) {
        let val = init;
        nums.forEach(element => val = fn(val, element))
        return val;
    };
    return init;
};
```

Como é um único argumento, posso não utilizar o parênteses para delimitar o argumento.

<br>

```js
function reduceArray(nums, fn, init) {
  return nums.reverse().reduceRight((val, num) => fn(val, num), init);
}
```

O reduce normal segue a ordem da esquerda para direita e o reduceRight segue a ordem da direita para esquerda.  

<br>

```js
function reduceArray(nums, fn, init) {
  if (nums.length === 0) {
    return init;
  } else {
    const head = nums[0];
    const tail = nums.slice(1);
    const val = fn(init, head);
    return reduceArray(tail, fn, val);
  }
}
```

Recursão.  

O método `slice()` retorna uma cópia de parte de um array a partir de um subarray criado entre as posições `início` e `fim` (fim não é incluído) de um array original. O Array original não é modificado.  

Na aplicação do método `slice()` no código acima, o parâmetro `fim` não é fornecido, portanto o subarray segue até o final do array original.  

Quando sobra um único elemento no array, este é atribuido a `head` e o método `slice(1)` retorna um array vazio, na próxima chamada da função será retornado `init`, que recebeu `val` na chamada da função anterior.  

<br>

```js
function reduceArray(nums, fn, init) {
  let val = init;
  for (const num of nums) {
    val = fn(val, num);
  }
  return val;
}
```

**Se usarmos `const num of nums`, `num` é o valor.**  
**Se usarmos `const num in nums`, `num` é o index.**  