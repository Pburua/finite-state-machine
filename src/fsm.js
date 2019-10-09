class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined)
            throw Error();

        this.config = config;
        this.currentState = this.config['initial'];
        this.previousState = null;
        this.nextState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config['states'].hasOwnProperty(state)) {
            this.previousState = this.currentState;
            this.currentState = state;
        }
        else throw Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config['states'][this.currentState]['transitions'].hasOwnProperty(event)){
            this.previousState = this.currentState;
            this.currentState = this.config['states'][this.currentState]['transitions'][event];
        }
        else throw Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config['initial'];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return Object.getOwnPropertyNames(this.config['states']);
        } else {
            let states_for_event = [];
            for (let state in this.config['states']) {
                if (this.config['states'].hasOwnProperty(state)) {
                    // console.log(state);
                    if (this.config['states'][state]['transitions'].hasOwnProperty(event))
                        states_for_event.push(state);
                }
            }
            return states_for_event;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState !== null) {
            this.nextState = this.currentState;
            this.currentState = this.previousState;
            this.previousState = null;
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState !== null) {
            this.currentState = this.nextState;
            this.nextState = null;
            return true;
        } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.nextState = null;
        this.previousState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
