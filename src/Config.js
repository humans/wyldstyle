let filesystem = require('fs');

class Config {
    /**
     * Create a new config store.
     * @param  {Object} config = {}
     * @param  {String} source = null
     * @return {Config}
     */
    constructor(config = {}, source = null) {
        let defaults = {
            prefix: 'u-',
            breakpoints: {},
            directory: null,
            output: null,
            emmet: {
                syntax: 'css',
                "snippets": {}
            },
        };

        Object.assign(defaults, config);

        this.config = defaults;
        this.config.source = source;
    }

    /**
     * Return the whole config.
     * @return {Object}
     */
    all() {
        return this.config;
    }

    /**
     * Return if the key exists in the store.
     * @param  {String}  key
     * @return {Boolean}
     */
    has(key) {
        return key in this.config;
    }

    /**
     * Return the value of the config.
     * @param  {String} key
     * @return {mixed}
     */
    get(key) {
        if (! this.has(key)) {
            return null;
        }

        return this.config[key];
    }
}

module.exports = Config;
