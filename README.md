# Startup for programming BabylonJS in Typescript

I wanted to learn Typescript and ES6, and write some simple games in BabylonJS.  But it took me a week to get the tool chain I liked working properly together.

There are fabulous tools available for building and testing, but they don't play together well.  Each one has little 'gotcha's.


### Switch to VSCODE

Please switch to VSCODE as your IDE.  I know everyone has a favorite text editor, and I still miss my previous one.  But VSCODE is lightning fast, has amazing GIT integration, and plays nicer with Typescript than other IDEs.

You may not have to relearn the keyboard codes you are familiar with. Check for VSCODE keymap extensions [here](https://code.visualstudio.com/docs/getstarted/keybindings#_keymap-extensions).  And print out the **Keyboard Shortcut Reference** for the OS you are using.



### Get started

I'm assuming you know how to use simple terminal commands and install software.

1. Install GIT on your machine from [here.](https://git-scm.com/)

2. Install NODE and NPM on your machine from [here.](https://nodejs.org/en/)

3. Install VSCODE on your machine from [here.](https://code.visualstudio.com/)


Probably worth while rebooting at this point.

Open VSCODE.  Press F1 and start typing "git clone", press enter when it is your only choice.  Paste in the URL you copied from GitHub's 'Copy or Clone' tool.  Create a directory on your machine for this when asked.

Still in VSCODE, open a terminal.  CTRL+SHIFT+M to open a console panel in VSCODE, and click on 'terminal' from the choices at the top of that panel.

Either way, type **npm install** to import the tools and libraries that this package recommends for you.  Each package can pull in its own sub-list of packages and libraries quickly get out of date.  If **this** repository has been updated in the last few months then you can probably ignore warnings about deprecated packages from other repositories.

Still in the terminal panel, type **npm run dev**. and you should soon see a browser open with something game-like.

### Running, testing, and packaging your code

1. You saw what the **npm run dev** command did (above).  It watches the source code and will recompile and relaunch if you change anything.

2. The **npm run build** command will build a clean version of your code in the \dist folder.  

3. The **npm run test** command will eventually run your tests, but I haven't set it up yet.  I'm a big fan of Test-Driven Development (TDD), you should read about it [here][(https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92].  But I have no idea how to apply TDD to game design, everything is so visual.




### Extensions for VSCODE

These are three extensions you absolutely must install into VSCODE for TypeScript.  For each one, copy the link, press CTRL+P and paste it in.

1.  tslint for linting: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ext install ms-vscode.vscode-typescript-tslint-plugin
2.  tsfmt for formatting:  &nbsp;&nbsp;&nbsp;ext install eternalphane.tsfmt-vscode
3.  typescript importer:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ext install pmneo.tsimporter

When editing, you can interactively 'lint' your code by pressing F8, and reformat the file you are working in with CTRL+SHIFT+I. The importer works behind the scenes.



### Formatting

I use tsfmt because I get upset when Beautify or Prettier does something crazy to my file, like converting

```        this._engine.runRenderLoop(() => {
            this.gameboard.update();
            this._scene.render();
```
to
 ```       // run the render loop
        this
            ._engine
            .runRenderLoop(() => {
                this
                    .gameboard
                    .update();
                this
                    ._scene
                    .render();
            });
```
Of course, that's a matter of taste, and by now you may have figured how to search and install extensions on your own.  Whatever formatter you like, as long as you use one.



### The AMMO Physics Engine

I've installed the AMMO Physics Engine for BabylonJS.  It's easy to change once you see how it is specified.