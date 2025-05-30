# 2665. Counter II

Write a function `createCounter`. It should accept an initial integer `init`. It should return an object with three functions.

The three functions are:

- `increment()` increases the current value by 1 and then returns it.  
- `decrement()` reduces the current value by 1 and then returns it.  
- `reset()` sets the current value to `init` and then returns it.  
 
 <br>

**Example 1:**

> **Input:** init = 5, calls = ["increment","reset","decrement"]  
> **Output:** [6,5,4]  
> **Explanation:**  
> const counter = createCounter(5);  
> counter.increment(); // 6  
> counter.reset(); // 5  
> counter.decrement(); // 4  

<br>

**Example 2:**

> **Input:** init = 0, calls = ["increment","increment","decrement","reset","reset"]  
> **Output:** [1,2,1,0,0]  
> **Explanation:  **
> const counter = createCounter(0);  
> counter.increment(); // 1  
> counter.increment(); // 2  
> counter.decrement(); // 1  
> counter.reset(); // 0  
> counter.reset(); // 0  
 
<br>

**Constraints:**

- `-1000 <= init <= 1000`  
- `0 <= calls.length <= 1000`  
- `calls[i]` is one of "increment", "decrement" and "reset"  

<br>

# Anotações

### Outras soluções

```js
var createCounter = function(init) {
    let val = init;
    return{
        increment: () => ++val,
        decrement: () => --val,
        reset: () => val = init
    }
};
```

No método `reset()`, a atribuição é feita antes de a variável ser retornada.  
**As arrow functions herdam o `this` do escopo em que estão e não possuem um valor `this` próprio.**

<br>

```js
var createCounter = function(init) {
  let presentCount = init;

  function increment() {
    return ++presentCount;
  }

  function decrement() {
      return --presentCount;
  }

  function reset() {
      return (presentCount = init);
  }

  return { increment, decrement, reset };
};
```

<br>

```js
class Counter {
  constructor(init) {
    this.init = init;
    this.presentCount = init;
  }

  increment() {
    this.presentCount += 1;
    return this.presentCount;
  }

  decrement() {
    this.presentCount -= 1;
    return this.presentCount;
  }

  reset() {
    this.presentCount = this.init;
    return this.presentCount;
  }
}

var createCounter = function(init) {
  return new Counter(init);
};
```

<br> 

```js
var createCounter = function(init) {
    let val = init;
    return {
        increment: function() {return ++val},
        decrement: function() {return --val},
        reset: function() {val = init; return val}
    }
};
```

<br>

```js
var createCounter = (init) => {
   return {
       count: init,
       increment() { return ++this.count },
       decrement() { return --this.count },
       reset() {
           this.count = init;
           return this.count;
       }
   }
};
```