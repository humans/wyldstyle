let filesystem = require('fs');
let Utility    = require('./Utility.js');
let Emmet      = require('./Emmet.js');
let Cache      = require('./Cache.js');

class Compiler
{
    /**
     * Create a new compiler.
     *
     * @param  {Object}  config
     * @return {Compiler}
     */
    constructor (config) {
        this.config  = config;
        this.cache   = this._buildCache();
        this.emmet   = new Emmet(config.all());
        this.utility = new Utility(config.get('prefix'), config.get('breakpoints'));
    }

    compile (files) {
        let prefix = this.config.get('prefix');
        let output = this.config.get('output');
        let breakpoints = ['css'].concat(Object.keys(this.config.get('breakpoints')));

        files.forEach(file => {
            filesystem.readFile(file, 'utf8', (error, content) => {
                if (error) { return; }

                let compiled  = [];
                let utilities = this.utility.extract(content);

                breakpoints.forEach(breakpoint => {
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

    /**
     * Create the caching handler for the files.
     *
     * @return {Cache}
     */
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
