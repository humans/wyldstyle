let { assert } = require('chai');
let Tachyons = require('../src/Tachyons');
let Config = require('../src/Config');

describe('Tachyons', () => {
    describe('#extract', () => {
        it('extracts out the utility classes from the given file content', () => {
            let config = new Config({
                prefix: 'u-',
                breakpoints: {
                    s: '1rem',
                    m: '2rem',
                    l: '3rem',
                }
            });
            let tachyons = new Tachyons({ config: config });
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

        it("extracts out the utilities inside quotes", () => {
            let config = new Config({
                prefix: 'u-',
            });
            let tachyons = new Tachyons({ config: config });
            let html = `
            <article class="u-p:20 u-m:22">
                <article class='u-p:21 u-m:23'>
                </article>
            </article>
            `;

            let expected = {
                css: ['u-m:22', 'u-m:23', 'u-p:20', 'u-p:21'],
            }

            assert.deepEqual(expected, tachyons.extract(html));
        });

        it('returns an empty array given that the data is undefined', () => {
            let undefined_variable;
            let config = new Config({
                prefix: 'u-',
                breakpoints: {
                    s: '1rem',
                    m: '2rem',
                    l: '3rem',
                }
            });
            let tachyons = new Tachyons({ config: config });
            let expected = {
                css: [],
                s: [],
                m: [],
                l: [],
            }

            assert.deepEqual(expected, tachyons.extract(undefined_variable));
        });

        it('returns an empty array given a string without matches', () => {
            let non_matchable_html = '<html></html>';
            let config = new Config({
                prefix: 'u-',
                breakpoints: {
                    s: '1rem',
                    m: '2rem',
                    l: '3rem',
                }
            });
            let tachyons = new Tachyons({ config: config });
            let expected = {
                css: [],
                s: [],
                m: [],
                l: [],
            }

            assert.deepEqual(expected, tachyons.extract(non_matchable_html));
        });
    });
});
