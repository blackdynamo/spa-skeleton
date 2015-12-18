"use strict";

var actions = require("app/actions"),
    Footer = require("./footer.jsx"),
    List = require("./list/index.jsx"),
    React = require("react");

module.exports = React.createClass({
    getInitialState(){
        return {};
    },

    getColumnClasses(){
        return "col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2";
    },

    onChange(e){
        this.setState({value: e.target.value});
    },

    onKeyPress(e){
        if(e.key !== "Enter") return;

        actions.todos
            .add({value: this.state.value})
            .then(() => this.setState({value: null}));
    },

    render() {
        return <div className="container">
            <div className="navbar"></div>
            <div className="row">
                <div className={ this.getColumnClasses() }>
                    <input type="text"
                           className="form-control input-lg"
                           placeholder="What needs to be done?"
                           value={ this.state.value }
                           onChange={ this.onChange }
                           onKeyPress={ this.onKeyPress }
                    />
                </div>
                <div className={ this.getColumnClasses() } style={ {marginTop: "5px"} }>
                    <List />
                </div>
                <div className={ this.getColumnClasses() } style={ {marginTop: "5px"} }>
                    <Footer />
                </div>
            </div>
        </div>;
    }
});