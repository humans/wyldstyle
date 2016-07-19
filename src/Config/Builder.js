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

        flags.output = flags.output.shift();

        return Object.assign(
            { directories: this.args },
            flags
        );
    }

    /**
     * Extract the flags from the arguments.
     */
    _extractFlags () {
        let flags  = {};

        let chunks = ['--watch', '--output', '--ignore']
            .map(flag => {
                return {
                    index:   this.args.indexOf(flag), // The current position after splicing.
                    pointer: this.args.indexOf(flag), // Reference for the original position.
                }
            })
            .filter(flag => flag.pointer > 0)
            .sort((a, b) => a.index > b.index)
            .forEach((flag, index, self) => {
                let next  = self[index + 1] || { pointer: 99 };
                let items = next.pointer - flag.pointer;
                let args  = this.args.splice(flag.index, items);

                next.index = flag.index; // Reallocate the pointer for splicing.

                flags[args.shift().replace('--', '')] = args.length ? args : true;
            });

        return flags;
    }
}

module.exports = Builder;

