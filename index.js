let config = require('./bootstrap.js');

try {
    config.validate();
} catch (error) {
    console.error(error);
}

console.error(config.all());

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
