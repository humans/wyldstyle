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
     * Return the config.
     *
     * @return {Object}
     */
    all () {
        return this.config;
    }
}

module.exports = Store;
