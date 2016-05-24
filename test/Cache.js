let { assert } = require('chai');
let Cache = require('../src/Cache');

describe('Cache', () => {
    it('returns the whole cache', () => {
        let cache = new Cache();

        assert.deepEqual({}, cache.all());
    });

    it('stores the key and an array value of the cache', () => {
        let cache = new Cache();

        cache.push('key', ['test']);

        assert.deepEqual(['test'], cache.get('key'));
    });

    it('sorts the values once stored', () => {
        let cache = new Cache();

        cache.push('key', ['test', 'array']);

        assert.deepEqual(['array', 'test'], cache.get('key'));
    });

    it('does not store duplicate values', () => {
        let cache = new Cache();

        cache.push('key', ['test', 'array', 'array']);

        assert.deepEqual(['array', 'test'], cache.get('key'));
    });
});
