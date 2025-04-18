/*
* var createHelloWorld = function() {
*     return function(...args){
*         return "Hello World";
*     }
* };
*/

/*
* var createHelloWorld = function() {
*     return () => "Hello World";
* };
*/

var createHelloWorld = function() {
    return (...args) => "Hello World";
};

const f = createHelloWorld();
f(); // "Hello World"