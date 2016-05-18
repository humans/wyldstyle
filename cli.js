var fs = require('fs');
var chokidar = require('chokidar');
var directory = process.argv[2];

var cache = [];

var config = {
    ignored: /[\/\\]\./,
}

function array_merge_distinct(array1, array2) {
    return array1.concat(array2).filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}

function match_utilities(data) {
    if (typeof data == 'undefined') {
        return;
    }

    let pattern = /(u-[A-Za-z0-9\:\@]+)\s/g;
    return data.match(pattern);
}

chokidar.watch(directory, config)
        .on('all', (event, path) => {
            console.log(event, path);

            fs.readFile(path, 'utf8', (error, data) => {
                let matches = match_utilities(data);

                if (! matches) { return; }

                cache = array_merge_distinct(cache, matches);

                console.log('Utilities: ', cache);
            });
        });
