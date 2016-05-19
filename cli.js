let lucy = require('./src/lucy');

if (process.argv.length != 4) {
    console.log('Usage: lucy <directory> <output> [--config=<lucy.json>]');

    process.exit();
}

lucy({
    directory: process.argv[2],
    output: process.argv[3],
});
