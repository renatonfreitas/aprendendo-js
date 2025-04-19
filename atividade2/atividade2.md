# 2620. Counter

Given an integer `n`, return a `counter` function. This `counter` function initially returns 1 more than the previous value every subsequent time it is called (`n`, `n+1`, `n+2`, etc).

Example 1:

> **Input:**  
> n = 10  
> ["call", "call", "call"]  
> **Output:** [10, 11, 12]  
> **Explanation:**  
> counter() = 10 // The first time counter() is called, it return n.  
> counter() = 11 // Returns 1 more than the previous time.  
> counter() = 12 // Returns 1 more than the previous time.  

Example 2:

> **Input:**  
> n = -2  
> ["call", "call", "call", "call", "call"]  
> **Output:**  
> **Explanation:** counter() initially returns -2. Then increases after each subsequent call.  

**Constraints:**

- -1000 <= n <= 1000
- 0 <= calls.length <= 1000
- calls[i] === "call"  
<br>  

# Anotações  
<br>

- Está usando o var porque é uma função anônima, se fosse uma função declarada sintaticamente, não teria o var antes.  
<br>

## **Var, let e const**
<br>

var -> declara uma variável  
var -> pode ter escopo global ou local  
var -> pode ser declarada de novo e atualizada dentro de seu escopo  
var -> sofre o hoisting sendo inicializada com um valor undefined 
var -> pode substituir o valor da variável de escopos diferentes e causar comportamentos inesperados 

let -> forma preferida de declarar variáveis  
let -> tem escopo de bloco (porção de código cercado por { })  
let -> opde ser atualizada dentro de seu escopo, mas não declarada novamente dentro de seu escopo  
let -> também sofrem o hoisting para o topo, porém não é inicializada causando, assim, um erro ao tentar usar a variável antes de sua declaração  

const -> declara um valor constante  
const -> tem escopo de bloco  
const -> não pode ser declarada e nem atualizada novamente, portanto deve ser inicializado no momento da declaração  
const -> também sofre o hoisting para o topo, mas não é inicializada  

(um objeto declarado com const não pode ser atualizado, mas é possível atualizar as propriedades desse objeto)  
<br>

---  
<br>

**Exemplo de Closure**

```js
function createAdder(a) {
    return function add(b) {
        const sum = a + b;
        return sum;
    }
}
const addTo2 = createAdder(2);
addTo2(5) // 7
```

A função mais externa pode ter várias funções internas acessando "a", cada uma com um funcionamento diferente. A função mais externa seria então uma fábrica de funções.  
<br>  

**Closures Versus Classes**

```js
class Adder {
    constructor(a) {
        this.a = a;
    }

    add(b) {
        const sum = this.a + b;
        return sum;
    }
}
const addTo2 = new Adder(2);
addTo2.add(5); // 7
```

Os dois códigos passados até então realizam basicamente a mesma ação. A diferença é que no exemplo da classe você pode escrever `addTo2.a = 3;` e alterar o comportamento esperado, simplesmente ignorando o **encapsulamento**.  

Cada instância da classe armazena uma referência para o **objeto protótipo** onde todos os métodos são armazenados enquanto que nas closures todos os métodos são gerados e uma cópia de cada um é armazenado na memória cada vez que a função mais externa é chamada.  

### closure x classe

closure -> encapsulamento funciona, menos eficiente  
classe -> encapsulamento pode ser falho, mais eficiente

