let { assert } = require('chai');
let Cache = require('../src/Cache');

describe('Cache', () => {
    it('returns the whole cache', () => {
        let cache = new Cache();

        assert.deepEqual({}, cache.all());
    });

    it('stores the key and an array value of the cache', () => {
        let cache = new Cache();

        cache.push('key', 'test');

        assert.deepEqual(['test'], cache.get('key'));
    });

    it('sorts the pushed arrays', () => {
        let cache = new Cache();

        cache.push('key', 'z');
        cache.push('key', 'a');
        cache.push('key', 'd');

        assert.deepEqual(['a', 'd', 'z'], cache.get('key'));
    });

    it('does not store values already stores in the cache', () => {
        let cache = new Cache();

        cache.push('key', 'first');
        cache.push('key', 'second');
        cache.push('key', 'first');

        assert.deepEqual(['first', 'second'], cache.get('key'));
    });
});
