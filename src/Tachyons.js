let Arr = require('./Arr');

class Tachyons
{
    /**
     * Create a new tachyon extractor.
     * @param  {Object} app
     * @return {Tachyons}
     */
    constructor(app) {
        this.app = app;

        this.breakpoints = Object.keys(app.config.get('breakpoints'));
    }

    /**
     * Extract the tachyons from the given file.
     * @param  {String} contents
     * @return {Array}
     */
    extract(contents) {
        let prefix = this.app.config.get('prefix');
        let pattern = new RegExp(`(${prefix}[A-Za-z0-9\\-\\:\\@\\!\\.\\$]+)[\\s'"]`, 'g');
        let defaults = { css: [] };

        this.breakpoints.forEach(breakpoint => { defaults[breakpoint] = []; });

        if (typeof contents == 'undefined') {
            return defaults;
        }

        let matches = contents.match(pattern);

        if (! matches) {
            return defaults;
        }

        return this._segregateBreakpoints(matches);
    }

    /**
     * Segregate the breakpoints.
     * @param  {Array} matches
     * @return {Object}
     */
    _segregateBreakpoints(matches) {
        let tachyons = Arr.unique(matches).sort().map(selector =>  selector.trim().replace(/['"]+$/, '') );
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
