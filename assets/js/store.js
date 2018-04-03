import { createStore, combineReducers } from 'redux';


function tasks(state = [], action) {
    switch (action.type) {
        case 'TASKS_LIST':
            return [...action.tasks];
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", action);
    let reducer = combineReducers({ tasks });
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return state1
};

let store = createStore(root_reducer);
export default store;

