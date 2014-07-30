# Description

`npmsvr` is a tiny front end to `npm` and [npm-server](https://www.npmjs.org/package/npm-server) that saves you keystrokes when testing NodeJS apps and libs prior to publishing them to the npm registry.

    $ npmsvr on      // Registers local registry server
    $ npmsvr start   // Start local registry server
    $ npmsvr off     // Deregisters local registry server`

I've forked npm-server and started rewrite to use cli-config that will implement this command line interface but for now we just install the two apps npmsvr and npm-server.

## Installation

    $ [sudo] npm install -g npm-server
    $ [sudo] npm install -g npmsvr

# Using `npmsvr` to test node apps before publishing to npm registry

In order to fully test the package configuration and ensure that modules behave as they will on the final deployment I now use the following procedure.  It completely avoids the need to hack your node_module directories or `require()` code so when you go to deploy it **just works**.  

For internal projects or pre-release to github you also might want to prevent accidental publication by anyone in your team by setting `"private": true` in your `package.json` so `npm` will then refuse to publish it.

1. Create a project directory under git version control and add all **your** node modules as subdirectories. Subdirectory names must match their package names.  If you're working with github, you will want to create a separate git repo for each module directory. They can be git submodules in your project repo.  Add `node_module` to your `.gitignore` files.

2. Used `npmsvr` to set your npm registry to localhost so now `npm` will talk to your local npm server to fetch packages. Any it finds as subdirectories it will send. Any it does not find it will proxy to `registry.npmjs.org` .
`
     $ npmsvr on
     $ cd ~/projects
     $ npmsvr start

3. Start a new shell and create a separate sandbox directory
`
    $ mkdir sandbox
    $ cd sandbox`

4.  Install your app using your local registry server. Clear local npm cache and reinstall your app. I do this on one line so it's easy to redo via the shell. You might want to script it.

    `$ npm cache clear; sleep 3; npm uninstall -g myapp; sleep 3; npm install -g myapp`

5. Test your app:

    `$ myapp ....`

6.   Deregister local npm registry when you're done installing:

     `$ npmsvr off`

7. Once you've completed testing you can publish your app and retest the deployment with npm-server stopped.

`
     $ cd ~/projects
     $ npm publish app`

___
Rather than register & deregister your local server, you can just use the localhost server for a one off install:

   `$ npm --registry=http://localhost:6070/ install app`
