let { assert } = require('chai');
let Utility = require('../src/Utility');

describe('Utility', () => {
    describe('#extract', () => {

        it('extracts out the utility classes from the given file content', () => {
            let utility = new Utility('u-', {
                s: '1rem',
                m: '2rem',
                l: '3rem',
            });

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

            assert.deepEqual(expected, utility.extract(html));
        });

        it("extracts out the utilities inside quotes", () => {
            let utility = new Utility('u-');

            let html = `
            <article class="u-p:20 u-m:22">
                <article class='u-p:21 u-m:23'>
                </article>
            </article>
            `;

            let expected = {
                css: ['u-m:22', 'u-m:23', 'u-p:20', 'u-p:21'],
            }

            assert.deepEqual(expected, utility.extract(html));
        });

        it('returns an empty array given that the data is undefined', () => {
            let undefined_variable;

            let utility = new Utility('u-', {
                s: '1rem',
                m: '2rem',
                l: '3rem',
            });

            let expected = {
                css: [],
                s: [],
                m: [],
                l: [],
            }

            assert.deepEqual(expected, utility.extract(undefined_variable));
        });

        it('returns an empty array given a string without matches', () => {
            let non_matchable_html = '<html></html>';

            let utility = new Utility('u-', {
                s: '1rem',
                m: '2rem',
                l: '3rem',
            });

            let expected = {
                css: [],
                s: [],
                m: [],
                l: [],
            }

            assert.deepEqual(expected, utility.extract(non_matchable_html));
        });

    });
});
