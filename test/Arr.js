let { assert } = require('chai');
let Arr = require('../src/Arr');

describe("Arr", () => {
    describe("#unique", () => {
        it('returns the unique values of the array', () => {
            let parameters = ['hello', 'world', 'hello', 'hi'];

            assert.deepEqual(['hello', 'world', 'hi'], Arr.unique(parameters));
        });
    });
});
