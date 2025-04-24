var compose = function(functions) {
    let arr = functions.reverse();
    return function(x) {
        let res = x;
        for (let i = 0; i < arr.length; i++) {
            res = arr[i](res);
        };
        return res;
    };
};

const fn = compose([x => x+1, x => 2*x])
fn(4) // 9