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

function process_files(event, path) {
    console.log(event, path);

    fs.readFile(path, 'utf8', (error, data) => {
        cache = cache_utiltiies(cache, data);

        console.log('Utilities: ', cache);
    });
}

chokidar.watch(directory, config).on('all', process_files);
