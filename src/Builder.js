let emmet = require('emmet');

class Builder
{
    /**
     * Create a new builder.
     * @param  {String} prefix
     * @return {Builder}
     */
    constructor(prefix = 'u-') {
        this.prefix = prefix;
    }

    /**
     * Get the prefix.
     * @return {String}
     */
    getPrefix() {
        return this.prefix;
    }

    /**
     * Generate the css styles.
     * @param  {Array} utilities
     * @return {Array}
     */
    generateStyles(utilities) {
        let css = [];

        for (let utility of utilities) {
            let shorthand = utility.replace(`${this.prefix}`, '')
                                   .replace(/\@[0-9A-Za-z]+/g, '');
            let expanded  = emmet.expandAbbreviation(shorthand, 'css').replace("\\$", "$");
            let selector  = utility.replace(':', "\\:")
                                   .replace('.', "\\.")
                                   .replace('$', "\\$")
                                   .replace('!', "\\!")
                                   .replace('@', "\\@");

            css.push(`.${selector} { ${expanded} }`);
        }

        return css;
    }
}

module.exports = Builder;
