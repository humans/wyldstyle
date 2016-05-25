let filesystem = require('fs');

class Config {
    constructor(config = {}) {
        this.config = config;
    }

    load(file) {
        this.config = this._readConfig(file);
    }

    all() {
        return this.config;
    }

    has(key) {
        return key in this.config;
    }

    get(key) {
        if (! this.has(key)) {
            return null;
        }

        return this.config[key];
    }

    _readConfig(file) {
        return JSON.parse(filesystem.readFileSync(file));
    }
}

module.exports = Config;
