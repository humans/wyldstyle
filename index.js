let config = require('./bootstrap.js');
let Watcher = require('./src/Watcher.js');
let Compiler = require('./src/Compiler.js');
let Filesystem = require('./src/Filesystem.js');


try {
    config.validate();
} catch (error) {
    console.error(error);
}

if (config.get('watch')) {
    console.log(`Watching ${config.get('directories')}`);

    (new Watcher(config)).start();
} else {
    let files = Filesystem.recursiveFilesSync(config.get('directories'));
    let compiler = new Compiler(config);

    compiler.compile(files);
}


// let files = Filesystem.recursiveFilesSync(config.get('directories'));
//
// let Watcher = require('./src/Watcher');
// let usage = 'Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]';
// let app = require('./bootstrap');
//
// if (app.config.get('directory').length == 0) {
//     console.log(usage);
//
//     process.exit();
// }
//
// let flags = app.config.get('flags');
//
// (new Watcher(app)).start();
