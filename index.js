let config = require('./bootstrap.js');
let Compiler = require('./src/Compiler.js');
let Filesystem = require('./src/Filesystem.js');


try {
    config.validate();
} catch (error) {
    console.error(error);
}

if (config.get('watch')) {

} else {
    let compiler = new Compiler(
        Filesystem.recursiveFilesSync(config.get('directories')),
        config
    );

    compiler.compile(config.get('output'));
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
