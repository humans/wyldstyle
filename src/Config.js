let filesystem = require('fs');

class Config {
    /**
     * Create a new config store.
     * @param  {Object} config = {}
     * @return {Config}
     */
    constructor(config = {}) {
        this.config = config;
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
