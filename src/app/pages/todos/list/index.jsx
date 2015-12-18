"use strict";

var _ = require("underscore"),
    Item = require("./item.jsx"),
    React = require("react"),
    store = require("app/store"),
    watch = require("app/store-watch-mixin");

function getState() {
    return {
        filter: store.get("filter"),
        todos: store.get("todos")
    };
}

module.exports = React.createClass({
    mixins: [watch(store, getState)],

    filter(todos){
        switch(this.state.filter){
            case "active":
                return _.filter(todos, (todo) => !todo.done);
            case "completed":
                return _.filter(todos, (todo) => !!todo.done);
            default:
                return todos;
        }
    },

    sort(todos){
        return _.sortBy(todos, (todo) => -todo.createDate);
    },

    renderItems(){
        return _.map(this.filter(this.sort(this.state.todos)), (item) => <Item key={ item.id } todo={ item } />);
    },

    render(){
        if (!this.state.todos.length) return null;

        return <ul className="list-group" style={ {marginBottom: "0"} }>
            { this.renderItems() }
        </ul>;
    }
});