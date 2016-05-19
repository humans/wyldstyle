let filesystem        = require('fs');
let chokidar          = require('chokidar');
let array_unique      = require('./array_unique');
let extract_utilities = require('./extract_utilities');
let generate_css      = require('./generate_css');

// Ignore the dotfiles.
let config = { ignored: /[\/\\]\./, }
let cache  = {};

module.exports = function (options) {
    chokidar.watch(options.directory, config).on('all', (event, filename) => {
        console.log(event, filename);

        filesystem.readFile(filename, 'utf8', (error, data) => {
            if (error) { return; }

            let utilities = extract_utilities(data);
            let styles    = generate_css(utilities);
            let compiled  = [];

            cache[filename] = styles;

            for (let index in cache) {
                compiled = compiled.concat(cache[index]);
            }

            compiled = array_unique(compiled).sort();

            filesystem.writeFile(options.output, compiled.join("\n"), (error) => {
                if (error) { return console.log(err); }

                console.log(`File saved on ${options.output}`);
            });
        });
    });
}
