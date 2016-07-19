let config = require('./bootstrap.js');

config.validate();

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
