let chokidar = require('chokidar');
let Compiler = require('./Compiler.js');

class Watcher
{
    constructor (config) {
        this.config = config;
        this.compiler = new Compiler(config);
    }

    start () {
        let watcherConfig = {
            ignored: this._buildIgnoredDirectories()
        };

        chokidar.watch(this.config.get('directories'), watcherConfig)
            .on('all', (event, file) => {
                console.log(event, file);

                this.compiler.compile([file]);
            });
    }

    _buildIgnoredDirectories () {
        let ignores = this.config.get('ignore') || null;

        if (! ignores) {
            return '';
        }

        return new RegExp(`${ignores.join('|')}`);
    }
}

module.exports = Watcher;

