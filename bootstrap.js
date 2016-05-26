let emmet = require('emmet');
let filesystem = require('fs');
let Config = require('./src/Config');

let path = `${process.cwd()}/wyldstyle.json`;
let source = 'cli';
let options = { // Config from the cli argmuments
    directory: process.argv.slice(2, -1),
    output: process.argv.slice(-1)[0],
};

/**
 * Let's see if the file exists.
 *
 * `accessSync` seems to throw an exception when the file does not exist
 * so that pretty much sucks
 */
try {
    filesystem.accessSync(path, fs.F_OK);

    options = JSON.parse(filesystem.readFileSync(path, 'utf8'));
    source  = path;
} catch (error) {}

emmet.loadPreferences(options.emmet.preferences);

module.exports = {
    config: new Config(options, source),
    emmet:  emmet,
};
