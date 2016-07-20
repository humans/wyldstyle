let filesystem = require('fs');
let Utility = require('./Utility.js');
let Emmet = require('./Emmet.js');
let Cache = require('./Cache.js');

class Compiler
{
    /**
     * Create a new compiler.
     *
     * @param  {Array}  files
     * @param  {Object}  config
     * @return {Compiler}
     */
    constructor (files, config) {
        this.files  = files;
        this.config = config;
        this.cache  = this._buildCache();

        this.emmet   = new Emmet(config.all());
        this.utility = new Utility(config.get('prefix'), config.get('breakpoints'));
    }

    compile (output) {
        let prefix      = this.config.get('prefix');
        let breakpoints = Object.keys(this.config.get('breakpoints'));

        this.files.forEach(file => {
            filesystem.readFile(file, 'utf8', (error, content) => {
                if (error) { return; }

                let compiled  = [];
                let utilities = this.utility.extract(content);

                ['css'].concat(breakpoints).forEach(breakpoint => {
                    this.cache[breakpoint].push(
                        file,
                        this.emmet.expand(utilities[breakpoint])
                    );

                    // this.cache[breakpoint].wrap(metric)
                    compiled.push(this._renderStylesheet(breakpoint));
                });

                // // Write the file
                filesystem.writeFile(output, compiled.join("\n\n"), (error) => {
                    if (error) { return console.log(error); }

                    console.log(`File saved on ${output}`);
                });
            });
        });
    }

    _buildCache () {
        let cache = { css: new Cache  };

        Object.keys(this.config.get('breakpoints'))
              .forEach(breakpoint => cache[breakpoint] = new Cache);

        return cache;
    }

    /**
     * Render the stylesheet.
     *
     * @param  {String}  object
     * @return {Array}
     */
    _renderStylesheet (breakpoint) {
        let metric = this.config.get('breakpoints')[breakpoint] || null;
        let query  = `@media (min-width: ${metric})`;
        let styles = this.cache[breakpoint].compile();

        if (metric) {
            return `${query} {\n\t${styles.join("\t\n")}\n}`;
        }

        return styles.join("\n");
    }
}

module.exports = Compiler;
