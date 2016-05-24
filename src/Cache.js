class Cache {
    constructor() {
        this.store = {};
    }

    /**
     * Return the store.
     * @return {Object}
     */
    all() {
        return this.store;
    }

    has(key) {
        return key in this.store;
    }

    /**
     * Push the value to the given key. Create the array when the key does not exist.
     * @param  {String} key
     * @param  {mixed} value
     * @return {void}
     */
    push(key, value) {
        if (! this.has(key)) {
            this.store[key] = new Array;
        }

        if (this.store[key].indexOf(value) > -1) {
            return;
        }

        this.store[key].push(value)
        this.store[key].sort();
    }

    /**
     * Return the cache from the given key.
     * @param  {String} key
     * @return {Array}
     */
    get(key) {
        return this.store[key];
    }

    /**
     * Return the compiled flat array.
     * @return {Array}
     */
    compile() {
        let compiled = [];

        return compiled;
    }
}

module.exports = Cache;
