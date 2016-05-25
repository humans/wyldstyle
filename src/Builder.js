var emmet = require('emmet');
class Builder
{
    constructor(prefix = 'u') {
        this.prefix = prefix;
    }

    getPrefix() {
        return this.prefix;
    }

    generateStyles(utilities) {
        let css = [];

        for (let utility of utilities) {
            let shorthand = utility.replace(`${this.prefix}-`, '');
            let expanded  = emmet.expandAbbreviation(shorthand, 'css').replace("\\$", "$");
            let selector  = utility.replace(':', "\\:")
                                   .replace(".", "\\.")
                                   .replace("$", "\\$")
                                   .replace("!", "\\!");

            css.push(`.${selector} { ${expanded} }`);
        }

        return css;
    }
}

module.exports = Builder;
