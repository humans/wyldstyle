class Builder
{
    constructor () {
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

        this.config = defaults;
    }

    merge () {

    }

    all () {
        return this.config;
    }
}

module.exports = Builder;
