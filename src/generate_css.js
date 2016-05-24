let emmet = require('emmet');

module.exports = function (utilities) {
    let css = [];

    for (let utility of utilities) {
        let shorthand = utility.replace('u-', '');
        let expanded  = emmet.expandAbbreviation(shorthand, 'css');
        let selector  = utility.replace(':', "\\:").replace(".", "\\.");

        css.push(`.${selector} { ${expanded} }`);
    }

    return css;
};
