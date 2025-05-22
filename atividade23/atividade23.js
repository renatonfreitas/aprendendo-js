Array.prototype.groupBy = function(fn) {
    let res = {}; // {temp: [this[i]]}; objeto resultante
    for (let i = 0; i < this.length; i++) {
        const temp = fn(this[i]); // função aplicada ao elemento atual
        if (res[temp]) {
            res[temp].push(this[i]);
        } else {
            res[temp] = [this[i]];
        }
    }
    return res;
};

[1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}