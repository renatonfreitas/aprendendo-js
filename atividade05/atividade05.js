 var map = function(arr, fn) {
    let returnedArray = [];
    for (let i = 0; i < Array.length; i++) {
        returnedArray[i] = fn(arr[i], i);
    };
    return returnedArray;
 };