"use strict";

var _ = require("underscore"),
    moment = require("moment"),
    storage = require("app/storage"),
    uuid = require("node-uuid");

module.exports = {
    add(todo){
        return storage
            .get("todos")
            .then((todos = []) => {
                todo.id = uuid.v4();
                todo.createDate = moment().unix();
                todos.push(todo);

                return Promise.resolve(todos);
            })
            .then((todos) => storage.set("todos", todos));
    },

    clear(){
        return storage.set("todos", []);
    },

    clearCompleted(){
        return storage
            .get("todos")
            .then((todos = []) => {
                return Promise.resolve(_.reject(todos, (item) => !!item.done));
            })
            .then((todos) => storage.set("todos", todos));
    },

    find(){
        return storage.get("todos")
            .then((todos = []) => Promise.resolve(todos));
    },

    remove(todo){
        return storage
            .get("todos")
            .then((todos = []) => {
                return Promise.resolve(_.reject(todos, (item) => item.id === todo.id));
            })
            .then((todos) => storage.set("todos", todos));
    },

    toggle(todo){
        return storage
            .get("todos")
            .then((todos = []) => {
                return Promise.resolve(_.reject(todos, (item) => item.id === todo.id));
            })
            .then((todos) => {
                todo.done = !todo.done;
                todos.push(todo);

                return Promise.resolve(todos);
            })
            .then((todos) => storage.set("todos", todos));
    }
};
