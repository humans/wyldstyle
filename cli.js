let filesystem        = require('fs');
let chokidar          = require('chokidar');
let array_unique      = require('./src/array_unique');
let extract_utilities = require('./src/extract_utilities');
let generate_css      = require('./src/generate_css');
let watch_directory   = process.argv[2];
let output_file       = process.argv[3];

if (process.argv.length != 4) {
    process.exit();
}

// Ignore the dotfiles.
let config = {
    ignored: /[\/\\]\./,
}

let cache = [];

chokidar.watch(watch_directory, config).on('all', (event, filename) => {
    console.log(event, filename);

    filesystem.readFile(filename, 'utf8', (error, data) => {
        if (error) {
            return;
        }

        let utilities = extract_utilities(data);
        let styles = generate_css(utilities);

        cache = array_unique(cache.concat(styles)).sort();

        filesystem.writeFile(output_file, cache.join("\n"), (error) => {
            if (error) {
                return console.log(err);
            }

            console.log(`File saved on ${__dirname}/${output_file}`);
        });
    });
});
