let filesystem        = require('fs');
let chokidar          = require('chokidar');
let extract_utilities = require('./extract_utilities');
let generate_css      = require('./generate_css');
let Cache = require('./Cache');

let cache  = new Cache;
let config = {
    ignored: /^(\.|.+\.([sl]*[aec]ss|styl))$/, // css, less, scss, sass, styl
};

module.exports = function (options) {
    chokidar.watch(options.directory, config).on('all', (event, filename) => {
        console.log(event, filename);

        // Read the file
        filesystem.readFile(filename, 'utf8', (error, data) => {
            if (error) { return; }

            let utilities = extract_utilities(data);
            let styles    = generate_css(utilities);
            let compiled  = [];

            cache.push(filename, styles);

            // Write the file
            filesystem.writeFile(options.output, cache.compile().join("\n"), (error) => {
                if (error) { return console.log(error); }

                console.log(`File saved on ${options.output}`);
            });
        });
    });
}
