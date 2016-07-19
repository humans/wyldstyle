let { assert } = require('chai');
let Emmet = require('../src/Emmet');
let expander = require('emmet');

describe("Emmet", () => {
    describe("#expand", () => {
        it("generates the css from the given utilities", () => {
            let emmet = new Emmet(expander, {
                prefix: 'u-',
                syntax: 'css',
            });
            let parameters = ['u-p:20', 'u-mb:30'];

            let expected = [
                '.u-p\\:20 { padding: 20px; }',
                '.u-mb\\:30 { margin-bottom: 30px; }'
            ];

            assert.deepEqual(expected, emmet.expand(parameters));
        });

        it("generates the css removing the media queries", () => {
            let emmet = new Emmet(expander, {
                prefix: 'u-',
                syntax: 'css',
            });
            let parameters = ['u-p:20@m', 'u-mb:30@m'];

            let expected = [
                '.u-p\\:20\\@m { padding: 20px; }',
                '.u-mb\\:30\\@m { margin-bottom: 30px; }'
            ];

            assert.deepEqual(expected, emmet.expand(parameters));
        });
    });
});
