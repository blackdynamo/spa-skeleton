"use strict";

function CommandGroup(options) {
    if (!options || !options.name) throw new Error("A command group requires a name");
    if (!options.commands) throw new Error("A command group requires commands");

    this._name = options.name;
    this._commands = options.commands;
}

CommandGroup.prototype.registerWith = function (app) {
    var commands = this._commands;

    for (var command in commands) {
        if (commands.hasOwnProperty(command)) {
            var name = this._name + ":" + commands[command].name;

            commands[command].registerWith(app, name);
            this[command] = this._name + ":" + commands[command].name;
        }
    }
};

module.exports = CommandGroup;