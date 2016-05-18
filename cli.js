let filesystem        = require('fs');
let chokidar          = require('chokidar');
let array_unique      = require('./src/array_unique');
let extract_utilities = require('./src/extract_utilities');
let generate_css      = require('./src/generate_css');
let directory         = process.argv[2];

// Ignore the dotfiles.
let config = {
    ignored: /[\/\\]\./,
}

let cache = [];

chokidar.watch(directory, config).on('all', (event, filename) => {
    console.log(event, filename);

    filesystem.readFile(filename, 'utf8', (error, data) => {
        if (error) {
            return;
        }

        let utilities = extract_utilities(data);
        let styles = generate_css(utilities);

        cache = array_unique(cache.concat(styles));

        console.log(cache.join("\n"));
    });
});
