const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

export function increment(value) {
    return {
        type: INCREMENT,
        payload: value
    };
}

export function decrement(value) {
    return {
        type: DECREMENT,
        payload: value
    };
}

export function undo(value) {
    return {
        type: UNDO,
        payload: value
    };
}

export function redo(value) {
    return {
        type: REDO,
        payload: value
    };
}
const initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: []
};

export default function counter(state = initialState, action) {
    switch(action.type) {
        case INCREMENT:
            return Object.assign( {}, state, { currentValue: (state.currentValue + action.payload), futureValues: [], previousValues: [ state.currentValue, ...state.previousValues ] } );
        
        case DECREMENT:
            return Object.assign( {}, state, { currentValue: ( state.currentValue - action.payload ), futureValues: [], previousValues: [ state.currentValue, ...state.previousValues ] } );

        case UNDO:
            return Object.assign( {}, state, { currentValue: state.previousValues[0], futureValues: [ state.currentValue, ...state.futureValues ], previousValues: state.previousValues.slice( 1, state.previousValues.length)  } )

        case REDO:
            return Object.assign( {}, state, { currentValue: state.futureValues[0], futureValues: state.futureValues.slice( 1, state.futureValues.length ), previousValues: [ state.currentValue, ...state.previousValues ] } )

        default:
            return state;
    }
}
