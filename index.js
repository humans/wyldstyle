let Watcher = require('./src/Watcher');
let usage = 'Usage: wyldstyle <directory> <output> [--config=<wyldstyle.json>]';
let app = require('./bootstrap');

if (app.config.get('directory').length == 0) {
    console.log(usage);

    process.exit();
}

console.log(`Wyldstyle config: ${app.config.get('source')}`);

let watcher = new Watcher(app);

watcher.start();
