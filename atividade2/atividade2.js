/*
* var createCounter = function(n) {
*     var rate = -1;
* 
*     return function() {
*         rate += 1;
*         return n + rate;
*     };
* };
*/

/*
* var createCounter = function(n) {
*     let currentCount = n - 1;
* 
*     return function() {
*         currentCount += 1;
*         return currentCount;
*     };
* };
*/

/*
* var createCounter = function(n) {
*    
*    return function(){
*        return n++;    
*    };
* };
*/

/*
* var createCounter = function(n) {
*     --n;
* 
*     return function() {
*         return ++n;
*     };
* };
*/

var createCounter = function(n) {
    return () => {return n++;};
};

const counter = createCounter(10);
counter(); // 10
counter(); // 11
counter(); // 12