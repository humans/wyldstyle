let filesystem = require('fs');
let Builder = require('./src/Config/Builder.js');
let Config = require('./src/Config/Store.js');

let config = new Config;
let path = process.cwd() + '/wyldstyle.json';
let args = process.argv.slice(2);

/**
 * Let's see if the file exists.
 *
 * `accessSync` seems to throw an exception when the file does not exist
 * so that pretty much sucks
 */
try {
    filesystem.accessSync(path, filesystem.F_OK);

    config = config.merge(JSON.parse(
        filesystem.readFileSync(path, 'utf8')
    ));
} catch (error) {}

module.exports = config.merge(
    (new Builder(args)).build()
);
