let emmet = require('emmet');
let filesystem = require('fs');
let Config = require('./src/Config');

/**
 * Extract the flags from the cli args.
 * @param  {Array} args
 * @return {Object}
 */
function extract_flags(args)
{
    let allowed_flags = ['--ignore', '-i', '--output', '-o'];
    let flags = {};

    for (flag of allowed_flags) {
        if(! args.includes(flag)) {
            continue;
        }

        let index = args.indexOf(flag);
        let [key, value] = args.splice(index, 2);

        flags[key] = value;
    }

    return flags;
}

let path = `${process.cwd()}/wyldstyle.json`;
let source = 'cli';
let args = process.argv;
let flags = extract_flags(args);

/**
 * Let's see if the file exists.
 *
 * `accessSync` seems to throw an exception when the file does not exist
 * so that pretty much sucks
 */
try {
    filesystem.accessSync(path, fs.F_OK);

    options = JSON.parse(filesystem.readFileSync(path, 'utf8'));
    source  = path;
} catch (error) {}

// Load the flags.
options.flags = flags;
options.directory = options.directory.concat(args.slice(2));

if ('--output' in flags || '-o' in flags) {
    options.output = flags['--output'] || flags['-o'];
}

emmet.loadPreferences(options.emmet.preferences);
emmet.loadSnippets({
    "css": { "snippets": options.emmet.snippets }
});

module.exports = {
    config: new Config(options, source),
    emmet:  emmet,
};
