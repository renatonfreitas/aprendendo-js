# 2619. Array Prototype Last

Write code that enhances all arrays such that you can call the `array.last()` method on any array and it will return the last element. If there are no elements in the array, it should return `-1`.  

You may assume the array is the output of `JSON.parse`.  

<br>

**Example 1:**

> **Input:** nums = [null, {}, 3]  
> **Output:** 3  
> **Explanation:** Calling nums.last() should return the last element: 3.  

<br>

**Example 2:**

> **Input:** nums = []  
> **Output:** -1  
> **Explanation:** Because there are no elements, return -1.  

<br>

**Constraints:**

- `arr` is a valid JSON array  
- `0 <= arr.length <= 1000`  

<br>

# Anotações

### Outras soluções

```js
Array.prototype.last = function() {
  if (this.length === 0) {
    return -1;
  } else {
    return this[this.length - 1];
  }
};
```

<br>

```js
Array.prototype.last = function() {
  return this.length ? this[this.length - 1] : -1;
};
```

É uma solução parecida com a que eu utilizei, porém mais esperta. `0` é considerado um valor `falsy` e qualquer outro número é `truthy`, então checar o tamanho do array já ativa a condição do operador ternário.

<br>

```js
Array.prototype.last = function() {
  return this.length ? this.slice(-1)[0] : -1;
};
```