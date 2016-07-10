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
    let defaults = {'--watch': false};

    let boolean_flags = extract_boolean_flags(args);
    let argument_flags = extract_flags_with_arguments(args);

    return Object.assign(defaults, boolean_flags, argument_flags);
}

function extract_flags_with_arguments (args)
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

function extract_boolean_flags (args) 
{
    let allowed_flags = ['--watch', '-w'];
    let flags = {};

    for (flag of allowed_flags) {
        if(! args.includes(flag)) {
            continue;
        }

        let key = args.splice(args.indexOf(flag), 1);

        flags[key] = true;
    }

    return flags;
}

let options = {
    prefix: 'u-',
    breakpoints: {},
    directory: [],
    output: null,
    emmet: {
        syntax: 'css',
        "snippets": {}
    },
};
let path = `${process.cwd()}/wyldstyle.json`;
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
} catch (error) {}

// Load the flags.
options.flags = flags;
options.directory = options.directory.concat(args.slice(2));

if ('--output' in flags || '-o' in flags) {
    options.output = flags['--output'] || flags['-o'];
}

// @todo add a flag when an output is not given.
if (! options.output) {
    throw 'No --output file specified';
}

emmet.loadPreferences(options.emmet.preferences);
emmet.loadSnippets({
    "css": { "snippets": options.emmet.snippets }
});

module.exports = {
    config: new Config(options),
    emmet:  emmet,
};
