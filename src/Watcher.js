let filesystem = require('fs');
let chokidar   = require('chokidar');
let Builder    = require('./Builder');
let Tachyons   = require('./Tachyons');
let Cache      = require('./Cache');

class Watcher
{
    /**
     * Create a new watcher.
     * @param  {Object} options
     * @return {Watcher}
     */
    constructor(options = {}) {
        this.options  = options;
        this.builder  = new Builder;
        this.cache    = new Cache;
        this.tachyons = new Tachyons;
    }

    /**
     * Start the listener.
     * @return {void}
     */
    start() {
        let watcherConfig = {
            ignored: /^(\.|.+\.([sl]*[aec]ss|styl))$/, // css, less, scss, sass, styl
        };

        chokidar.watch(this.options.directory, watcherConfig).on('all', (event, filename) => {
            console.log(event, filename);

            // Read the file
            filesystem.readFile(filename, 'utf8', (error, data) => {
                if (error) { return; }

                let utilities = this.tachyons.extract(data);

                this.cache.push(
                    filename,
                    this.builder.generateStyles(utilities)
                );

                // Write the file
                filesystem.writeFile(
                    this.options.output,
                    this.cache.compile().join("\n"),
                    (error) => {
                        if (error) { return console.log(error); }

                        console.log(`File saved on ${this.options.output}`);
                    }
                );
            });
        });
    }
}

module.exports = Watcher;
