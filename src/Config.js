let filesystem = require('fs');

class Config {
    constructor(file) {
        this.config = this._readConfig(file);
    }

    all() {
        return this.config;
    }

    _readConfig(file) {
        return JSON.parse(filesystem.readFileSync(file));
    }
}

module.exports = Config;
