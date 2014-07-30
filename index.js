#!/usr/bin/env node

function help () {
	var appName = 'npmsvr';
	console.log(appName + ' on                   - Registers local NPM server');
	console.log(appName + ' off                  - Deregisters local NPM server.');
	console.log(appName + ' start [packages-dir] - Starts NPM server with packages folder.');
};

function serve(options, args) {
	if (args && args.length == 1) {
		process.chdir(args[0]);
	}
	run('npm-server');
}

try {
    var path = require('path');
    
    var run = function(cmd) {
        console.log(cmd);
        require('shelljs').exec(cmd);
    };	

    require('cli-config').run({ dirname: __dirname, fnHelp: help, cmdTree: {    
        help: help,
        on: function() {
            run('npm set registry http://localhost:6070/');  
        },
        off: function() {
            run('npm set registry http://registry.npmjs.org:80/');  
        },
        start: serve,
        serve: serve
    }});
} catch (ex) {
    console.error(ex);
    process.exit(1);
}
