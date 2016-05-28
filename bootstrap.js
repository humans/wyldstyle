let emmet = require('emmet');
let filesystem = require('fs');
let Config = require('./src/Config');

function extract_flags(args)
{
    let allowed_flags = ['--ignore', '-i'];
    let flags = {};

    for (flag of allowed_flags) {
        if(! args.includes(flag)) {
            continue;
        }

        let index = args.indexOf(flag);
        let [key, value] = args.splice(index, index + 2); // +2 because the second is `up to`.

        flags[key] = value;
    }

    return flags;
}

let path = `${process.cwd()}/wyldstyle.json`;
let source = 'cli';
let args = process.argv;
let flags = extract_flags(args);

let options = { // Config from the cli argmuments
    directory: args.slice(2, -1),
    output: args.slice(-1)[0],
};

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

emmet.loadPreferences(options.emmet.preferences);
emmet.loadSnippets({
    "css": { "snippets": options.emmet.snippets }
});

module.exports = {
    config: new Config(options, source),
    emmet:  emmet,
};
