let assert = require('chai').assert;
let generate_css = require('../src/generate_css');

describe('#generate_css', () => {
    it('generates the stylesheet from the array of given utilities', () => {
        let parameters = ['u-p:20', 'u-mb:30'];

        let expected = [
            '.u-p\\:20 { padding: 20px; }',
            '.u-mb\\:30 { margin-bottom: 30px; }'
        ];

        assert.deepEqual(expected, generate_css(parameters));
    });
});
