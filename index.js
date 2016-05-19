let filesystem = require('fs');
let wyldstyle = require('./src/wyldstyle');
let read_config = require('./src/read_config');
let config = {};
let has_config = true;

try {
    let path = './wyldstyle.json';

    filesystem.accessSync(path, fs.F_OK)

    config = read_config(path);
} catch (e) {
    has_config = false;
}


if (! has_config  && process.argv.length != 4) {
    console.log('Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]');

    process.exit();
}

if (! has_config) {
    config = {
        directory: process.argv[2],
        output: process.argv[3],
    }
}


wyldstyle(config);
