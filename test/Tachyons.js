let { assert } = require('chai');
let Tachyons = require('../src/Tachyons');

describe('Tachyons', () => {
    describe('#extract', () => {
        it('extracts out the utility classes from the given file content', () => {
            let tachyons = new Tachyons('u-', ['s', 'm', 'l']);
            let html = `
            <article class="article [ u-p:20 ]">
                <h1 class="article__title [ u-mb:24 u-fz:18 u-fz:22@m ]">Hello</h1>

                <section class="article__content [ u-mt:12 u-mb:13 u-mb:24 ]">
                </section>
            </article>
            `;

            let expected = {
                css: ['u-fz:18', 'u-mb:13', 'u-mb:24', 'u-mt:12', 'u-p:20'],
                s: [],
                m: ['u-fz:22@m'],
                l: [],
            }

            assert.deepEqual(expected, tachyons.extract(html));
        });

        it('returns an empty array given that the data is undefined', () => {
            let undefined_variable;
            let tachyons = new Tachyons;

            assert.deepEqual({ css: [] }, tachyons.extract(undefined_variable));
        });

        it('returns an empty array given a string without matches', () => {
            let non_matchable_html = '<html></html>';
            let tachyons = new Tachyons;

            assert.deepEqual({ css: [] }, tachyons.extract(non_matchable_html));
        });
    });
});
