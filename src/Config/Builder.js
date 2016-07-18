let _ = require('underscore');

class Builder
{
    /**
     * Create a new builder.
     */
    constructor (args) {
        this.args = args;
    }

    /**
     * Build the argument into a config file.
     */
    build () {
        let flags = this._extractFlags();

        return {};
    }

    /**
     * Extract the flags from the arguments.
     */
    _extractFlags () {
        let flags  = {};
        let chunks = ['--watch', '--output', '--ignore']
            .map(flag => this.args.indexOf(flag))
            .sort()
            .map((start, index, self) => {
                let end = self[index + 1] || this.args.length;

                return this.args.slice(start, end);
            });

        chunks.forEach(chunk => {
            let flag = chunk.shift().replace('--', '');

            flags[flag] = chunk ? chunk : true;
        });

        return flags;
    }
}

module.exports = Builder;
