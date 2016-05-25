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
    });
});
