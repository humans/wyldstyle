var fs = require('fs');
var chokidar = require('chokidar');
var directory = process.argv[2];

var cache = [];
var config = { ignored: /[\/\\]\./, } // Ignore the dotfiles.

function array_merge_distinct(array1, array2) {
    return array1.concat(array2).filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}

function match_utilities(data) {
    let pattern = /(u-[A-Za-z0-9\:\@]+)\s/g;

    if (typeof data == 'undefined') {
        return null;
    }

    return data.match(pattern);
}

function cache_utiltiies(cache, data) {
    let matches = match_utilities(data);

    if (! matches) {
        return cache;
    }

    return array_merge_distinct(cache, matches);
}

function expand_css(emmet) {
    let utility = emmet.replace('u-', '').trim();
    let [ attribute, value ] = utility.split(':');

    let attributes = {
        'fw': 'font-weight',
        'fs': 'font-size',

        'p': 'padding',
        'pl': 'padding-left',
        'pr': 'padding-right',
        'pt': 'padding-top',
        'pb': 'padding-bottom',

        'm': 'margin',
        'ml': 'margin-left',
        'mr': 'margin-right',
        'mt': 'margin-top',
        'mb': 'margin-bottom',
    };

    return `${attributes[attribute]}: rem(${value});`;
}

function build_css(classes) {
    let css = "";

    for (index in classes) {
        let emmet    = classes[index];
        let escaped  = emmet.replace(':', '\\:').replace('@', '\\@');
        let selector = `.${escaped}`;
        let expanded = expand_css(emmet);

        css = css + `${selector} { ${expanded} }\n`;
    }

    return css;
}

function process_files(event, path) {
    console.log(event, path);

    fs.readFile(path, 'utf8', (error, data) => {
        cache = cache_utiltiies(cache, data).sort();

        let stylesheets = build_css(cache);
        console.log(stylesheets);

        console.log('Utilities: ', cache);
    });
}

chokidar.watch(directory, config).on('all', process_files);
