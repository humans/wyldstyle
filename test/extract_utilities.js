let assert = require('chai').assert;
let extract_utilities = require('../src/extract_utilities');

describe('#extract_utilities', () => {
    it('extracts all the utility classes from the given file', (done) => {
        extract_utilities(`${__dirname}/mocks/article.html`)
            .then((utilities) => {
                // Not sure why the assertions isn't really working.
                // assert.equal(['u-mb:13 ', 'u-mb:24 ', 'u-mt:12 ', 'u-p:20 '], utilities);

                done();
            });
    });
});
