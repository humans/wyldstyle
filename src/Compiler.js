let filesystem = require('fs');
let Utility = require('./Utility.js');
let Emmet = require('./Emmet.js');

class Compiler
{
    constructor (files, config) {
        this.files  = files;
        this.config = config;

        this.emmet   = new Emmet(config.all());
        this.utility = new Utility(config.get('prefix'), config.get('breakpoints'));
    }

    compile (output) {
        let compiled    = [];
        let prefix      = this.config.get('prefix');
        let breakpoints = this.config.get('breakpoints');

        this.files.forEach(file => {
            filesystem.readFile(file, 'utf8', (error, content) => {
                if (error) { return; }

                let utilities = this.utility.extract(content);

                for (let breakpoint in utilities) {
                    compiled.push(
                        this.emmet.expand(utilities[breakpoint])
                    );
                }

                // breakpoints.forEach((breakpoint) => {
                //     let wrapper = null;
                //     let metric  = this.app.config.get('breakpoints')[breakpoint];
                //
                //     this.cache[breakpoint].push(
                //         filename,
                //         this.builder.generateStyles(tachyons[breakpoint])
                //     );
                //
                //     if (breakpoint != 'css') {
                //         wrapper = `@media (min-width: ${metric})`;
                //     }
                //
                //     compiled.push(this.cache[breakpoint].stringify(wrapper));
                // });
                //
                // // Write the file
                // filesystem.writeFile(this.app.config.get('output'), compiled.join("\n\n"), (error) => {
                //     if (error) { return console.log(error); }
                //
                //     console.log(`File saved on ${this.app.config.get('output')}`);
                //
                //     if (! this.app.config.get('flags')['--watch']) {
                //         process.exit();
                //     }
                // });
            });
        });

        console.error(compiled);
    }
}

module.exports = Compiler;
