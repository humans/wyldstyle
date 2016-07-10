let Watcher = require('./src/Watcher');
let usage = 'Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]';
let app = require('./bootstrap');

if (app.config.get('directory').length == 0) {
    console.log(usage);

    process.exit();
}

let flags = app.config.get('flags');

if (flags['--watch']) {
    (new Watcher(app)).start();
} else {

}
