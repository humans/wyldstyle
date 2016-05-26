class Builder
{
    /**
     * Create a new builder.
     * @param  {Object} app
     * @return {Builder}
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Get the prefix.
     * @return {String}
     */
    getPrefix() {
        return this.app.config.get('prefix');
    }

    /**
     * Generate the css styles.
     * @param  {Array} utilities
     * @return {Array}
     */
    generateStyles(utilities) {
        let css = [];
        let prefix = this.app.config.get('prefix');
        let syntax = this.app.config.get('emmet').syntax;

        for (let utility of utilities) {
            let shorthand = utility.replace(`${prefix}`, '')
                                   .replace(/\@[0-9A-Za-z]+/g, '');
            let selector = utility.replace(':', "\\:")
                                  .replace('.', "\\.")
                                  .replace('$', "\\$")
                                  .replace('!', "\\!")
                                  .replace('@', "\\@");
            let expanded = this.app.emmet
                               .expandAbbreviation(shorthand, syntax)
                               .replace("\\$", "$");

            css.push(`.${selector} { ${expanded} }`);
        }

        return css;
    }
}

module.exports = Builder;
