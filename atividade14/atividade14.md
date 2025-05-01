# 2715. Timeout Cancellation

Given a function `fn`, an array of arguments `args`, and a timeout `t` in milliseconds, return a cancel function `cancelFn`.

After a delay of `cancelTimeMs`, the returned cancel function `cancelFn` will be invoked.

- setTimeout(cancelFn, cancelTimeMs)

Initially, the execution of the function `fn` should be delayed by `t` milliseconds.

If, before the delay of `t` milliseconds, the function `cancelFn` is invoked, it should cancel the delayed execution of `fn`. Otherwise, if `cancelFn` is not invoked within the specified delay `t`, `fn` should be executed with the provided `args` as arguments.

<br>

**Example 1:**

> **Input:** fn = (x) => x * 5, args = [2], t = 20  
> **Output:** [{"time": 20, "returned": 10}]  
> **Explanation:**  
> const cancelTimeMs = 50;  
> const cancelFn = cancellable((x) => x * 5, [2], 20);  
> setTimeout(cancelFn, cancelTimeMs);  
>   
> The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened after the execution of fn(2) at 20ms.  

<br>

**Example 2:**

> **Input:** fn = (x) => x**2, args = [2], t = 100  
> **Output:** []  
> **Explanation:**  
> const cancelTimeMs = 50;  
> const cancelFn = cancellable((x) => x**2, [2], 100);  
> setTimeout(cancelFn, cancelTimeMs);  
>   
> The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened before the execution of fn(2) at 100ms, resulting in fn(2) never being called.  

<br>

**Example 3:**

> **Input:** fn = (x1, x2) => x1 * x2, args = [2,4], t = 30  
> **Output:** [{"time": 30, "returned": 8}]  
> **Explanation:**  
> const cancelTimeMs = 100;  
> const cancelFn = cancellable((x1, x2) => x1 * x2, [2,4], 30);  
> setTimeout(cancelFn, cancelTimeMs);  
>   
> The cancellation was scheduled to occur after a delay of cancelTimeMs (100ms), which happened after the execution of fn(2,4) at 30ms.  
 
<br>

**Constraints:**

- `fn` is a function
- `args` is a valid JSON array
- `1 <= args.length <= 10`
- `20 <= t <= 1000`
- `10 <= cancelTimeMs <= 1000`

<br>

# Anotações 

Quando invoca a função `cancellable`, `const timer` é executado, este possui um comportamtento assíncrono, o que signfica que enquanto o delay está sendo contabilizado, outros códigos podem ser executados, então se o timeout demorar mais do que o `cancelTimeMs`, o timeout dele vai ser cancelado e a função não vai ser executada. Agora, se `const timer` tiver um delay menor que `cancelTimeMs`, mesmo que o timeout seja cancelado, a função já terá sido executada e já terá um valor para retonar.  

O `clearTimeout` efetivamente remove o timeout da fila de eventos programados. Portanto, a função de callback desse timeout **nunca será executada**.  

Se chamar o clearTimeout depois que o delay acabou e a função de callback foi executada, não acontecerá nada (não dá erro, mas também não resulta em nada, seria atoa). Chamar o `clearTimeout` com um `timerID` inválido ou inexistente terá o mesmo efeito.

`setTimeout` retorna um `timerId`.

`const cancel = cancellable(log, args, t);`. Quando essa linha é executada, a função `cancellable` é executada e o `cancel` recebe a função retornada `cancelFn`, então quando eu invoco `cancel`, eu estou invocando a função `cancelFn` que cancela o timeout da função `fn`. Se o `timer` tiver executado antes de `cancel` ter sido invocado, não muda nada. Se `cancel` tiver sido chamado antes de `timer` ter sido executado, o timeout é cancelado e `fn` nunca será executado, cancelando assim a função.

O timeout começa imediatamente quando `cancellable` é chamado e atribuído a `cancel`, e a função retornada dá a capacidade de cancelar esse timeout quando `cancel` é invocada. A questão é que o `cancelTimeMs` é definido na chamada da função pelo usuário, então a dificuldade do exercício é criar um código levando isso em consideração.