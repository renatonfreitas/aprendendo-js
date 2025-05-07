/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function(arr, size) {
    let res = [];

    let start = 0;
    while (start < arr.length) {
        let end = start + size;
        const temp = arr.slice(start, end);
        res.push(temp);
        start += size;
    }

    return res;
}