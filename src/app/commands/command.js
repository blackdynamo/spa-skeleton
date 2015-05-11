"use strict";

function Command(options) {
    if (!options || !options.name) throw new Error("A command requires a name");
    if (!options.execute) throw new Error("A command requires an execute");

    this.name = options.name;
    this.execute = options.execute;
}

Command.prototype.registerWith = function(app, name){
    this._app = app;

    app.commands.setHandler(name || this.name, this.execute.bind(this));
};

module.exports = Command;