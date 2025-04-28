var addTwoPromises = async function(promise1, promise2) {
    const valueA = await promise1;
    const valueB = await promise2;
    return Promise.resolve(valueA + valueB);
};

addTwoPromises(Promise.resolve(2), Promise.resolve(2))
    .then(console.log); // 4