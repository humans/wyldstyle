let Arr = require('./Arr');

class Utility
{
    /**
     * Create a new tachyon extractor.
     *
     * @param  {String} prefix
     * @param  {Object} breakpoints
     * @return {Utility}
     */
    constructor(prefix, breakpoints = {}) {
        this.prefix = prefix;
        this.breakpoints = Object.keys(breakpoints);
    }

    /**
     * Extract the utility from the given file.
     *
     * @param  {String} contents
     * @return {Array}
     */
    extract(contents) {
        let pattern  = new RegExp(`(${this.prefix}[A-Za-z0-9\\-\\:\\@\\!\\.\\$]+)[\\s'"]`, 'g');
        let defaults = { css: [] };

        this.breakpoints
            .forEach(breakpoint => defaults[breakpoint] = []);

        if (typeof contents == 'undefined') {
            return defaults;
        }

        let matches = contents.match(pattern);

        if (! matches) {
            return defaults;
        }

        return this._isolateBreakpoints(matches);
    }

    /**
     * Isolate the breakpoints.
     *
     * @param  {Array} matches
     * @return {Object}
     */
    _isolateBreakpoints(matches) {
        let utilities = Arr.unique(matches).sort().map(selector =>  selector.trim().replace(/['"]+$/, '') );
        let reference = {
            css: utilities.filter(utility => ! utility.includes('@'))
        };

        this.breakpoints.forEach(breakpoint => {
            reference[breakpoint] = utilities.filter(
                utility => utility.includes(`@${breakpoint}`)
            );
        });

        return reference;
    }
}

module.exports = Utility;
