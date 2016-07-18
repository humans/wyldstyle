let { assert } = require('chai');
let Builder = require('../src/Config/Builder.js');

describe('Config Builder', () => {
    describe('#all', () => {
        it('has default values given no arguments', () => {
            let builder = new Builder;

            let actual = builder.all();
            let expected = {
                prefix: 'u-',
                breakpoints: {},
                directories: [],
                output: null,
                emmet: {
                    syntax: 'css',
                    "snippets": {}
                },
            };

            assert.deepEqual(expected, actual);
        });
    });

    describe('#merge', () => {
        it('merges the attributes with the defaults', () => {
            let builder = new Builder;

            builder.merge({
                directories: ['tests/'],

            });

            let actual = builder.all();
            let expected = {
                prefix: 'u-',
                breakpoints: {},
                directories: ['tests/'],
                output: 'utilities.css',
                emmet: {
                    syntax: 'css',
                    "snippets": {}
                },
            };


            assert.deepEqual(expected, actual);
        });
    });
});

