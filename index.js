let filesystem = require('fs');
let lucy = require('./src/lucy');
let read_config = require('./src/read_config');
let config = {};
let has_config = true;

try {
    let path = './lucy.json';

    filesystem.accessSync(path, fs.F_OK)

    config = read_config(path);
} catch (e) {
    has_config = false;
}


if (! has_config  && process.argv.length != 4) {
    console.log('Usage: lucy <directory> <output> [--config=<lucy.json>]');

    process.exit();
}

if (! has_config) {
    config = {
        directory: process.argv[2],
        output: process.argv[3],
    }
}


lucy(config);
