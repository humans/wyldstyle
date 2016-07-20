class Emmet
{
    /**
     * Create a new emmet.
     *
     * @param  {Object} options
     * @return {Emmet}
     */
    constructor (options = {}) {
        this.options = options;
        this.emmet = this.setEmmet();
    }

    /**
     * Configure emmet.
     *
     * @return {emmet}
     */
    setEmmet () {
        let emmet = require('emmet');

        if ('emmet' in this.options) {
            emmet.loadPreferences(this.options.emmet.preferences);
            emmet.loadSnippets({
                "css": { "snippets": this.options.emmet.snippets }
            });
        }

        return emmet;
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

            let selector = this._buildSelector(utility)
            let expanded = this.emmet
                   .expandAbbreviation(shorthand, this.options.emmet.syntax)
                   .replace("\\$", "$");

            css.push(`.${selector} { ${expanded} }`);
        }

        return css;
    }

    /**
     * Build the selector.
     *
     * @return {String}
     */
    _buildSelector (utility) {
        return utility.replace(':', "\\:")
            .replace('.', "\\.")
            .replace('$', "\\$")
            .replace('!', "\\!")
            .replace('@', "\\@");
    }
}

module.exports = Emmet;
