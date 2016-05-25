let Arr = require('./Arr');

class Tachyons
{
    /**
     * Create a new tachyon extractor.
     * @param  {String} prefix
     * @param  {Array} breakpoints
     * @return {Tachyons}
     */
    constructor(prefix = 'u-', breakpoints = []) {
        this.prefix = prefix;
        this.breakpoints = breakpoints;
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

        return this._segregateBreakpoints(matches);
    }

    /**
     * Segregate the breakpoints.
     * @param  {Array} matches
     * @return {Object}
     */
    _segregateBreakpoints(matches) {
        let tachyons = Arr.unique(matches).sort().map(selector => selector.trim());
        let reference = {
            css: tachyons.filter(tachyon => ! tachyon.includes('@'))
        };

        this.breakpoints.forEach(breakpoint => {
            reference[breakpoint] = tachyons.filter(tachyon => {
                return tachyon.includes(`@${breakpoint}`);
            });
        });

        return reference;
    }
}

module.exports = Tachyons;
