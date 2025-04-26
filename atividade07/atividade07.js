var reduce = function(nums, fn, init) {
    if (nums.length > 0) {
        let val = init;
        nums.forEach((element) => {
            val = fn(val, element);
        });
        return val;
    };
    return init;
};