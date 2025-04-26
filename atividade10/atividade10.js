var once = function(fn) {
    let called = false;

    return function(...args) {
        if (!called) {
            called = true;
            return fn(...args);
        };
        return undefined; // explícito
    };
};

let fn = (a,b,c) => (a+b+c);
let onceFn = once(fn);

onceFn(1,2,3); // 6
onceFn(2,3,6); // returns undefined without calling fn