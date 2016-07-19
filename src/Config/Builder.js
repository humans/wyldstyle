/**
 * This takes in the command line arguments and parses it into something much
 * more coherent.
 *
 * This is a refactor of the bootstrap.js file wherein the CLI arguments were
 * parsed and validated through so all hell broke loose when new arguments
 * started popping in.
 */
class Builder
{
    /**
     * Create a new builder.
     *
     * @param  {Object}  args
     * @return {Object}
     */
    constructor (args) {
        this.args = args;
    }

    /**
     * Build the argument into a config file.
     *
     * @return {Object}
     */
    build () {
        let flags = this._extractFlags();

        if ('output' in flags) {
            flags.output = flags.output.shift();
        }

        return Object.assign(
            { directories: this.args },
            flags
        );
    }

    /**
     * Extract the flags from the arguments.
     *
     * Map through the available flags and fetch the indexes from the array.
     * From there, we measure the gap between the elements to fetch any parameters
     * that may have been set for that flag.
     *
     * Rather than looping through the arguments, I kinda think this i much more
     * manageable.
     *
     * @return {Object}
     */
    _extractFlags () {
        let flags = {};

        ['--watch', '--output', '--ignore']
            .map(flag => {
                return {
                    index:   this.args.indexOf(flag), // The current position after splicing.
                    pointer: this.args.indexOf(flag), // Reference for the original position.
                }
            })
            .filter(flag => flag.pointer >= 0)
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

