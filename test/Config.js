var assert = require('chai').assert;
var Config  = require('../src/Config');

describe("Config", () => {
    describe("#read", () => {
        let config = new Config(`${__dirname}/mocks/config.json`);

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
