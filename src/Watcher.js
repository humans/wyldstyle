let filesystem = require('fs');
let chokidar = require('chokidar');
let Builder = require('./Builder');
let Tachyons = require('./Tachyons');
let Cache = require('./Cache');

class Watcher
{
    /**
     * Create a new watcher.
     * @param  {Object} app
     * @return {Watcher}
     */
    constructor(app) {
        this.app      = app;
        this.builder  = new Builder(app);
        this.tachyons = new Tachyons(app);
        this.cache    = this._setCacheStores();
    }

    /**
     * Start the listener.
     * @return {void}
     */
    start() {
        let breakpoints = Object.keys(this.app.config.get('breakpoints'));
        breakpoints.unshift('css');

        let watcherConfig = {
            ignored: /^(\.|.+\.([sl]*[aec]ss|styl))$/, // css, less, scss, sass, styl
        };

        chokidar.watch(this.app.config.get('directory'), watcherConfig).on('all', (event, filename) => {
            console.log(event, filename);

            // Read the file
            filesystem.readFile(filename, 'utf8', (error, data) => {
                if (error) { return; }

                let compiled = [];
                let tachyons = this.tachyons.extract(data);

                // this.cache.css.push(filename, this.builder.generateStyles(tachyons.css));
                breakpoints.forEach((breakpoint) => {
                    let wrapper = null;
                    let metric  = this.app.config.get('breakpoints')[breakpoint];

                    this.cache[breakpoint].push(
                        filename,
                        this.builder.generateStyles(tachyons[breakpoint])
                    );

                    if (breakpoint != 'css') {
                        wrapper = `@media (max-width: ${metric})`;
                    }

                    compiled.push(this.cache[breakpoint].stringify(wrapper));
                });

                // Write the file
                filesystem.writeFile(this.app.config.get('output'), compiled.join("\n\n"), (error) => {
                    if (error) { return console.log(error); }

                    console.log(`File saved on ${this.app.config.get('output')}`);
                });

            });
        });
    }

    _setCacheStores() {
        let cache = { css: new Cache };
        let breakpoints = Object.keys(this.app.config.get('breakpoints'));

        breakpoints.forEach((breakpoint) => { cache[breakpoint] = new Cache });

        return cache;
    }
}

module.exports = Watcher;
