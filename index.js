let filesystem = require('fs');
let Watcher = require('./src/Watcher');
let Config = require('./src/Config');

let usage = 'Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]';
let fileConfig = {};
let hasConfig = false;
let cliConfig = { // Config from the cli argmuments
    directory: process.argv.slice(2, -1),
    output: process.argv.slice(-1)[0],
};

// Let's see if the file exists.
//
// accessSync seems to throw an exception when the file does not exist sooo,
// that pretty much sucks
try {
    let contents;
    let path = `${process.cwd()}/wyldstyle.json`;

    filesystem.accessSync(path, fs.F_OK);

    hasConfig = true;
    fileConfig = JSON.parse(filesystem.readFileSync(path, 'utf8'));
} catch (error) {}

if (! hasConfig && process.argv.length < 4) {
    console.log(usage);

    process.exit();
}

let config = new Config(hasConfig ? fileConfig : cliConfig);
let watcher = new Watcher(config.all());

watcher.start();
