"use strict";

var _ = require("underscore"),
    actions = require("app/actions"),
    classNames = require("classnames"),
    React = require("react");

module.exports = React.createClass({
    getButtonStyle(){
        return {
            fontSize: "30px",
            lineHeight: "28px"
        };
    },

    getCheckboxButtonStyle(){
        return _.extend(this.getButtonStyle(), {
            lineHeight: "34px",
            padding: "0"
        });
    },

    getCheckboxIconClasses(){
        return classNames({
            "fa": true,
            "fa-square-o": !this.props.todo.done,
            "fa-check-square-o": !!this.props.todo.done
        });
    },

    getCheckboxIconStyle(){
        return {
            color: "rgba(0,0,0,0.2)"
        };
    },

    getDescriptionStyle(){
        var style = {
            fontSize: "24px"
        };

        if(!!this.props.todo.done) {
            style.color = "rgba(0,0,0,0.2)";
            style.textDecoration = "line-through";
        }

        return style;
    },

    onCheck(){
        actions.todos.toggle(this.props.todo);
    },

    onRemove(){
        actions.todos.remove(this.props.todo);
    },

    render(){
        return <li className="list-group-item">
            <div className="row">
                <div className="col-xs-2" style={ {width: "60px"} }>
                    <button className="btn btn-link" style={ this.getCheckboxButtonStyle() } onClick={ this.onCheck }>
                        <i className={ this.getCheckboxIconClasses() } style={ this.getCheckboxIconStyle() }/>
                    </button>
                </div>
                <div className="col-xs-7 col-sm-9">
                    <span style={ this.getDescriptionStyle() }>{ this.props.todo.value }</span>
                </div>
                <div className="col-xs-2 pull-right" style={ {width: "48px"} }>
                    <button className="close" style={ this.getButtonStyle() } onClick={ this.onRemove }>&times;</button>
                </div>
            </div>
        </li>;
    }
});