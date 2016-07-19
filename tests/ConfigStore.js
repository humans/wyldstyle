let { assert, expect } = require('chai');
let Store = require('../src/Config/Store.js');

describe('Config Store', () => {
    describe('#all', () => {
        it('has default values given no arguments', () => {
            let store = new Store;

            let actual = store.all();
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
            let store = new Store;

            let actual = store.merge({
                directories: ['tests/'],
                output: 'utilities.css'
            }).all();

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

    describe('#validate', () => {
        it('throws', () => {
            let store = new Store;

            expect(store.validate).to.throw(Error)
        });
    });
});

