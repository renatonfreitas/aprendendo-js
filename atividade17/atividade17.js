var TimeLimitedCache = function() {
    this.cache = new Map();
};

/**
 * @param {number} key 
 * @param {number} value 
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed 
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    
    let found = this.cache.has(key);

    if (found) {
        clearTimeout(this.cache.get(key).ref);
    };

    this.cache.set(key, {
        value, // equivale a escrever `value: value`
        ref: setTimeout(() => this.cache.delete(key), duration)
    });

    return found;
};

/**
 * @param {number} key 
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    let valueReturned = -1;

    if (this.cache.has(key)) {
        valueReturned = this.cache.get(key).value;
    };

    return valueReturned;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 1000); // false
timeLimitedCache.get(1); // 42
timeLimitedCache.count(); // 1