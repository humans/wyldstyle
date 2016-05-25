let filesystem = require('fs');
let Arr = require('./Arr');

/**
 * Extract out all the utility classes.
 *
 * @param  {String} content
 * @return {Array}
 */
module.exports = function (content) {
    let pattern = /(u-[A-Za-z0-9\:\@\!\.]+)\s/g;

    if (typeof content == 'undefined') {
        return [];
    }

    let matches = content.match(pattern);

    if (! matches) {
        return [];
    }

    return Arr.unique(matches)
            .sort()
            .map((selector) => {
                return selector.trim();
            });
}
