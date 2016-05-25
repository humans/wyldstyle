let { assert } = require('chai');
let Tachyons = require('../src/Tachyons');

describe('Tachyons', () => {
    describe('#extract', () => {
        it('extracts out the utility classes from the given file content', () => {
            let tachyons = new Tachyons;
            let html = `
            <article class="article [ u-p:20 ]">
                <h1 class="article__title [ u-mb:24 ]">Hello</h1>

                <section class="article__content [ u-mt:12 u-mb:13 u-mb:24 ]">
                </section>
            </article>
            `;

            assert.deepEqual(
                ['u-mb:13', 'u-mb:24', 'u-mt:12', 'u-p:20'],
                tachyons.extract(html)
            );
        });

        it('returns an empty array given that the data is undefined', () => {
            let undefined_variable;
            let tachyons = new Tachyons;

            assert.deepEqual([], tachyons.extract(undefined_variable));
        });

        it('returns an empty array given a string without matches', () => {
            let non_matchable_html = '<html></html>';
            let tachyons = new Tachyons;

            assert.deepEqual([], tachyons.extract(non_matchable_html));
        });
    });
});
