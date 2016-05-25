let filesystem = require('fs');
let chokidar   = require('chokidar');
let Builder    = require('./Builder');
let Tachyons   = require('./Tachyons');
let Cache      = require('./Cache');

class Watcher
{
    /**
     * Create a new watcher.
     * @param  {Config} config
     * @return {Watcher}
     */
    constructor(config) {
        this.config   = config;
        this.builder  = new Builder(config.get('prefix'));
        this.tachyons = new Tachyons(config.get('prefix'));
        this.cache    = new Cache;
    }

    /**
     * Start the listener.
     * @return {void}
     */
    start() {
        let watcherConfig = {
            ignored: /^(\.|.+\.([sl]*[aec]ss|styl))$/, // css, less, scss, sass, styl
        };

        chokidar.watch(this.config.get('directory'), watcherConfig).on('all', (event, filename) => {
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
                    this.config.get('output'),
                    this.cache.compile().join("\n"),
                    (error) => {
                        if (error) { return console.log(error); }

                        console.log(`File saved on ${this.config.get('output')}`);
                    }
                );
            });
        });
    }
}

module.exports = Watcher;
