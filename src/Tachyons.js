let Arr = require('./Arr');

class Tachyons
{
    extract(contents) {
        let pattern = /(u-[A-Za-z0-9\:\@\!\.]+)\s/g;

        if (typeof contents == 'undefined') {
            return [];
        }

        let matches = contents.match(pattern);

        if (! matches) {
            return [];
        }

        return Arr.unique(matches)
                .sort()
                .map(selector => selector.trim());
    }
}

module.exports = Tachyons;
