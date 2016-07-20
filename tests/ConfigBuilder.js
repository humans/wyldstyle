let { assert } = require('chai');
let Builder = require('../src/Config/Builder.js');

describe('Config Builder', () => {
    describe('#build', () => {
        it('takes the argument parameters and fetches all the flags', () => {
            let args    = ['templates', 'index.html', '--ignore', 'storage', 'assets/css', '--watch', '--output', 'css/utilities.css'];
            let builder = new Builder(args);

            let expected = {
                directories: ['templates', 'index.html'],
                ignore:      ['storage', 'assets/css'],
                output:      'css/utilities.css',
                watch:       true,
            };

            assert.deepEqual(expected, builder.build());
        });
    });
});
