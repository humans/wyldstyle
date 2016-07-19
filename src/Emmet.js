class Emmet
{
    /**
     * Create a new emmet.
     *
     * @param  {Object} emmet
     * @param  {Object} options
     * @return {Emmet}
     */
    constructor (emmet, options = {}) {
        this.emmet = emmet;
        this.options = options;
    }

    /**
     * Generate the css styles.
     *
     * @param  {Array} utilities
     * @return {Array}
     */
    expand(utilities) {
        let css = [];

        for (let utility of utilities) {
            let shorthand = utility.replace(`${this.options.prefix}`, '')
                                   .replace(/\@[0-9A-Za-z]+/g, '');

            let selector = utility.replace(':', "\\:")
                                  .replace('.', "\\.")
                                  .replace('$', "\\$")
                                  .replace('!', "\\!")
                                  .replace('@', "\\@");

            let expanded = this.emmet
                   .expandAbbreviation(shorthand, this.options.syntax)
                   .replace("\\$", "$");

            css.push(`.${selector} { ${expanded} }`);
        }

        return css;
    }
}

module.exports = Emmet;
