let assert = require('chai').assert;
let extract_utilities = require('../src/extract_utilities');

describe('#extract_utilities', () => {
    it('extracts all the utility classes from the given file', () => {
        let html = `
        <article class="article [ u-p:20 ]">
            <h1 class="article__title [ u-mb:24 ]">Hello</h1>

            <section class="article__content [ u-mt:12 u-mb:13 u-mb:24 ]">
            </section>
        </article>
        `;

        assert.deepEqual(['u-mb:13', 'u-mb:24', 'u-mt:12', 'u-p:20'], extract_utilities(html));
    });

    it('returns an empty array given that the data is undefined', () => {
        let undefined_variable;

        assert.deepEqual([], extract_utilities(undefined_variable));
    });

    it('returns an empty array given a string without matches', () => {
        let non_matchable_html = '<html></html>';

        assert.deepEqual([], extract_utilities(non_matchable_html));
    });
});
