var assert = require('chai').assert;
var Config  = require('../src/Config');

describe("Config", () => {
    describe("constructor", () => {
        it("loads defaults given unset attributes", () => {
            let config = new Config;

            assert.deepEqual('u-', config.get('prefix'));
        });
    });

    describe("#load", () => {
        it("reads the json config file", () => {
            let config = new Config({
                "breakpoints": {
                    "s": "1rem",
                    "m": "2rem",
                    "l": "3rem"
                },
                "directory": "tests/mocks",
                "output": "tests/mocks/wyldstyle.styl"
            });

            var expected = {
                breakpoints: {
                    s: "1rem",
                    m: "2rem",
                    l: "3rem",
                },
                directory: "tests/mocks",
                output:    "tests/mocks/wyldstyle.styl",
                prefix:    "u-",
            };

            assert.deepEqual(expected, config.all());
        });
    });

    describe("#get", () => {
        it("returns the key of the given config", () => {
            let config = new Config({
                "breakpoints": {
                    "s": "1rem",
                    "m": "2rem",
                    "l": "3rem"
                },
                "directory": "tests/mocks",
                "output": "tests/mocks/wyldstyle.styl",
            });

            let expected = {
                s: "1rem",
                m: "2rem",
                l: "3rem",
            };

            assert.deepEqual(expected, config.get('breakpoints'));
        });

        it("returns null given a non-existent key", () => {
            let config = new Config;

            assert.deepEqual(null, config.get('non-existent'));
        });
    });
});
