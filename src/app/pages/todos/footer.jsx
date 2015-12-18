"use strict";

var _ = require("underscore"),
    actions = require("app/actions"),
    classNames = require("classnames"),
    React = require("react"),
    store = require("app/store"),
    watch = require("app/store-watch-mixin");

function getState() {
    return {
        todos: store.get("todos"),
        filter: store.get("filter")
    };
}

module.exports = React.createClass({
    mixins: [watch(store, getState)],

    clearCompleted(){
        actions.todos.clearCompleted();
    },

    filter(e){
        if (e.target.tagName !== "BUTTON") return;

        actions.filter.update(e.target.name);
    },

    getButtonClasses(name){
        return classNames({
            "btn": true,
            "btn-link": name !== this.state.filter,
            "btn-default": name === this.state.filter
        });
    },

    getClearButtonClasses(){
        var items = this.getItemsLeft();

        return classNames({
            "btn btn-link": true,
            "hide": items.length === this.state.todos.length
        });
    },

    getItemsLeft(){
        return _.filter(this.state.todos, (item) => !item.done);
    },

    getItemsLeftMessage(){
        var items = this.getItemsLeft();
        return `${items.length} item${items.length === 1 ? "" : "s"} left`;
    },

    render(){
        if (!this.state.todos.length) return null;

        return <div>
            <div className="col-xs-2">
                <p className="form-control-static">{ this.getItemsLeftMessage() }</p>
            </div>
            <div className="col-xs-7 text-center" onClick={ this.filter }>
                <button name="all" type="button" className={ this.getButtonClasses("all") }>All</button>
                <button name="active" type="button" className={ this.getButtonClasses("active") }>Active</button>
                <button name="completed" type="button" className={ this.getButtonClasses("completed") }>Completed</button>
            </div>
            <div className="col-xs-3 text-right">
                <button type="button" className={ this.getClearButtonClasses() } onClick={ this.clearCompleted }>Clear completed</button>
            </div>
        </div>;
    }
});