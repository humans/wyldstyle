class Builder
{
    /**
     * Create a new builder.
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
     */
    merge (config) {
        return new Builder(config);
    }

    /**
     * Return the config.
     */
    all () {
        return this.config;
    }
}

module.exports = Builder;
