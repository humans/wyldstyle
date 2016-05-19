var assert = require('chai').assert;
var read_config = require('../src/read_config');

describe('#read_config', () => {
    it('reads the config and returns a json object', () => {
        var config = read_config(`${__dirname}/mocks/config.json`);

        var expected = {
            directory: "tests/mocks",
            output:    "tests/mocks/lucy.styl",
        };

        assert.deepEqual(expected, config);
    });
