let fs = require('fs');

class Filesystem
{
    /**
     * Refactor this
     *
     * @param  {Array}  directories
     * @param  {Array}  filelist
     * @return {Array}
     */
    recursiveFilesSync (directories, filelist) {
        filelist = filelist || [];

        directories.forEach((directory) => {
            fs.readdirSync(directory)
                .forEach((file) => {
                    if (fs.statSync(directory + '/' + file).isDirectory()) {
                        filelist = this.recursiveFilesSync(
                            [directory + '/' + file],
                            filelist
                        );
                    } else {
                        filelist.push(`${directory}/${file}`);
                    }
                });

        });

        return filelist;
    }
}

module.exports = new Filesystem;
