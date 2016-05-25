let { assert } = require('chai');
let Builder = require('../src/Builder');

describe("Builder", () => {
    describe("#build", () => {
        it("sets the prefix", () => {
            let builder = new Builder;

            assert.deepEqual('u', builder.getPrefix())
        });

        it("generates the css from the given utilities", () => {
            let builder = new Builder;
            let parameters = ['u-p:20', 'u-mb:30'];

            let expected = [
                '.u-p\\:20 { padding: 20px; }',
                '.u-mb\\:30 { margin-bottom: 30px; }'
            ];

            assert.deepEqual(expected, builder.generateStyles(parameters));
        });
    });
});
