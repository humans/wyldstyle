let Arr = require('./Arr');

class Tachyons
{
    /**
     * Create a new tachyon extractor.
     * @param  {String} prefix
     * @return {Tachyons}
     */
    constructor(prefix = 'u-') {
        this.prefix = prefix;
    }

    /**
     * Extract the tachyons from the given file.
     * @param  {String} contents
     * @return {Array}
     */
    extract(contents) {
        let pattern = new RegExp(`(${this.prefix}[A-Za-z0-9\\:\\@\\!\\.\\$]+)\\s`, 'g');

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
