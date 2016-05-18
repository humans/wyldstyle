let assert = require('chai').assert;
let array_unique = require('../src/array_unique');

describe('#array_unique', () => {
    it('returns the unique values of the array', () => {
        let parameters = ['hello', 'world', 'hello', 'hi'];

        assert.deepEqual(['hello', 'world', 'hi'], array_unique(parameters));
    });
});
