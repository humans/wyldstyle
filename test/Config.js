var assert = require('chai').assert;
var Config  = require('../src/Config');

describe("Config", () => {
    describe("#load", () => {
        it("reads the json config file", () => {
            let config = new Config;
            config.load(`${__dirname}/mocks/config.json`);

            var expected = {
                breakpoints: {
                    s: "1rem",
                    m: "2rem",
                    l: "3rem",
                },
                directory: "tests/mocks",
                output:    "tests/mocks/wyldstyle.styl"
            };

            assert.deepEqual(expected, config.all());
        });
    });

    describe("#get", () => {
        it("returns the key of the given config", () => {
            let config = new Config;
            config.load(`${__dirname}/mocks/config.json`);

            let expected = {
                s: "1rem",
                m: "2rem",
                l: "3rem",
            };

            assert.deepEqual(expected, config.get('breakpoints'));
        });

        it("returns null given a non-existent key", () => {
            let config = new Config;

            assert.deepEqual(null, config.get('breakpoints'));
        });
    });
});
