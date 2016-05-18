var fs = require('fs');
var chokidar = require('chokidar');
var directory = process.argv[2];

var cache = [];

var config = {
    ignored: /[\/\\]\./,
}

chokidar.watch(directory, config)
        .on('all', (event, path) => {
            console.log(event, path);
            fs.readFile(path, 'utf8', (error, data) => {
                if (typeof data == 'undefined') { return; }

                let matches = data.match(/(u-[A-Za-z0-9\:\@]+)\s/g);
                cache = cache.concat(matches).filter((elem, pos, arr) => {
                    return arr.indexOf(elem) == pos;
                });

                console.log(cache);
            });
        });
