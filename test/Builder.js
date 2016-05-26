let { assert } = require('chai');
let Builder = require('../src/Builder');
let Config = require('../src/Config');
let emmet = require('emmet');

describe("Builder", () => {
    describe("#build", () => {
        it("sets the prefix", () => {
            let config = new Config({ prefix: 'u-' });
            let builder = new Builder({ emmet: emmet, config: config });

            assert.deepEqual('u-', builder.getPrefix())
        });

        it("generates the css from the given utilities", () => {
            let config = new Config({ prefix: 'u-' });
            let builder = new Builder({ emmet: emmet, config: config });
            let parameters = ['u-p:20', 'u-mb:30'];

            let expected = [
                '.u-p\\:20 { padding: 20px; }',
                '.u-mb\\:30 { margin-bottom: 30px; }'
            ];

            assert.deepEqual(expected, builder.generateStyles(parameters));
        });

        it("generates the css removing the media queries", () => {
            let config = new Config({ prefix: 'u-' });
            let builder = new Builder({ emmet: emmet, config: config });
            let parameters = ['u-p:20@m', 'u-mb:30@m'];

            let expected = [
                '.u-p\\:20\\@m { padding: 20px; }',
                '.u-mb\\:30\\@m { margin-bottom: 30px; }'
            ];

            assert.deepEqual(expected, builder.generateStyles(parameters));
        });
    });
});
