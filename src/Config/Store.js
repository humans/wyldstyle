class Store
{
    /**
     * Create a new config store.
     *
     * @param  {Object}  config
     * @return {Object}
     */
    constructor (config = {}) {
        let defaults = {
            prefix: 'u-',
            breakpoints: {},
            directories: [],
            output: null,
            emmet: {
                syntax: 'css',
                "snippets": {}
            },
        };

        this.config = Object.assign(defaults, config);
    }

    /**
     * Merge the new config to the defaults.
     *
     * @param  {Objet}  config
     * @return {Object}
     */
    merge (config) {
        return new Store(Object.assign(this.config, config));
    }

    /**
     * Get the value for the given key.
     *
     * @param  {String} key
     * @return {mixed}
     */
    get (key) {
        return this.config[key];
    }

    /**
     * Return the config.
     *
     * @return {Object}
     */
    all () {
        return this.config;
    }

    /**
     * Validate the options.
     *
     * @return Boolean
     */
    validate () {
        if (! this.config.output) {
            throw new Error('No output file specified. --output');
        }

        if (this.config.directories.length < 1) {
            throw new Error('No files or directories to watch.');
        }

        return true;
    }
}

module.exports = Store;
