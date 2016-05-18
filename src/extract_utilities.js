let filesystem = require('fs');

/**
 * Extract out all the utility classes.
 *
 * @param  {String} content
 * @return {Array}
 */
let extract_utilities = function (content) {
    let pattern = /(u-[A-Za-z0-9\:\@]+)\s/g;

    if (typeof content == 'undefined') {
        return [];
    }

    return content.match(pattern);
}

/**
 * Use the file read and wrap it around a promise for async.
 *
 * @param  {String} filename
 * @return {Promise}
 */
module.exports = function (filename) {
    return new Promise((resolve, reject) => {
        filesystem.readFile(filename, 'utf8', (error, data) => {
            if (error) {
                throw "Unable to read file";
            }

            resolve(extract_utilities(data));
        });
    })
}
