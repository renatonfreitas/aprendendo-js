var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        if (functions.length === 0) {
            resolve([]);
            return;
        }

        const res = new Array(functions.length).fill(null);

        let resolvedCount = 0;

        functions.forEach((promise, index) => {
            promise().then((subResult) => {
                res[index] = subResult;
                resolvedCount++;
                if (resolvedCount === functions.length) {
                    resolve(res);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    });
};

const promise = promiseAll([() => new Promise(res => res(42))])
promise.then(console.log) // [42]