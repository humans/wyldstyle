let filesystem = require('fs');

module.exports = function (file) {
    let config = filesystem.readFileSync(file);

    return JSON.parse(config);
}
