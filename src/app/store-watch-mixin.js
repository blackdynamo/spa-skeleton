"use strict";

module.exports = (store, getState) => {
    return {
        getInitialState() {
            return getState();
        },

        componentWillMount() {
            store.on("change", this.onStoreChange, this);
        },

        componentWillUnmount() {
            store.off(null, null, this);
        },

        onStoreChange() {
            this.setState(getState());
        }
    };
};