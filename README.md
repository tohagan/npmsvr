## Description

npmsvr is a tiny font end to npm and npm-server that provide the following commands

    $ npmsvr on      // Registers local registry server
    $ npmsvr start   // Start local registry server
    $ npmsvr off     // Deregisters local registry server`

I've forked npm-server and started rewrite to use cli-config that will implement this command line interface but for now we just install the two apps npmsvr and npm-server.

## How to test NodeJS app before publishing them to npm registry

In order to fully test the package configuration and ensure that modules behave as they will on the final deployment I now use the following procedure.  It completely avoids the need to hack your node_module directories or `require()` code so when you go to deploy it **just works**.  

For internal projects or pre-release to github you also might want to prevent accidental publication by anyone in your team by setting `"private": true` in your `package.json` so `npm` will then refuse to publish it.

1. Create a project directory under git version control and add all **your** node modules as subdirectories. Subdirectory names must match their package names.  If you're working with github, you will want to create a separate git repo for each module directory. They can be git submodules in your project repo.  Add `node_module` to your `.gitignore` files.

2. Install a tool like [npm-server][1] and run it in the project directory. Then set npm registry to localhost so now `npm` will talk to your local npm server to fetch packages. Any it finds as subdirectories it will send. Any it does not find it will proxy to `registry.npmjs.org` .
`
     $ npm set registry http://localhost:6070/
     $ cd ~/projects
     $ npm-server`

3. Start a new shell and create a separate sandbox directory
`
    $ mkdir sandbox
    $ cd sandbox`

4.  Install your app using your local registry server. Clear local npm cache and reinstall your app. I do this on one line so it's easy to redo via the shell. You might want to script it.

    `$ npm cache clear; sleep 3; npm uninstall -g app; sleep 3; npm install -g app`

5. Test your app:

    `$ app ....`

6.   Deregister local npm registry when you're done installing:

    `$ npm set registry http://registry.npmjs.org:80/`

7. Once you've completed testing you can publish your app and retest the deployment with npm-server stopped.

`
     $ cd ~/projects
     $ npm publish app`

___
Rather than register & deregister the sever, you can just use the localhost server for a one off install: 
`
    $ npm --registry=http://localhost:6070/ install app`

___
I'm in the process of writing a forked version of `npm-server` so you just do:
`
    $ npmsvr on      // Registers local registry server
    $ npmsvr start   // Start local registry server
    $ npmsvr off     // Deregisters local registry server`

  [1]: https://www.npmjs.org/package/npm-server