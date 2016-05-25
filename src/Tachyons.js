let Arr = require('./Arr');

class Tachyons
{
    extract(contents) {
        let pattern = /(u-[A-Za-z0-9\:\@\!\.]+)\s/g;

        let matches = contents.match(pattern);

        return Arr.unique(matches)
                .sort()
                .map(selector => selector.trim() );
    }
}

module.exports = Tachyons;
