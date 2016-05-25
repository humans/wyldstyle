let filesystem = require('fs');
let Watcher = require('./src/Watcher');
let Config = require('./src/Config');

let path = `${process.cwd()}/wyldstyle.json`;
let usage = 'Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]';
let hasFileConfig = false;
let fileConfig = {};
let cliConfig = { // Config from the cli argmuments
    directory: process.argv.slice(2, -1),
    output: process.argv.slice(-1)[0],
};
let defaults = {
    prefix:      'u-',
    breakpoints: {},
    directory:   null,
    output:      null,
};

// Let's see if the file exists.
//
// accessSync seems to throw an exception when the file does not exist sooo,
// that pretty much sucks
try {
    filesystem.accessSync(path, fs.F_OK);

    hasFileConfig = true;
    fileConfig = JSON.parse(filesystem.readFileSync(path, 'utf8'));
} catch (error) {}

if (! hasFileConfig && process.argv.length < 4) {
    console.log(usage);

    process.exit();
}

if (hasFileConfig) {
    console.log(`Wyldstyle config found: ${path}`);
}

let config = new Config(hasFileConfig ? fileConfig : cliConfig);
let watcher = new Watcher(config.all());

watcher.start();
