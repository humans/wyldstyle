let emmet = require('emmet');

module.exports = function (utilities) {
    let css = [];

    for (let utility of utilities) {
        let shorthand = utility.replace('u-', '');
        let expanded  = emmet.expandAbbreviation(shorthand, 'css');

        css.push(`.${utility} { ${expanded} }`);
    }

    return css;
};
