import { createStore, combineReducers } from 'redux';


function tasks(state = [], action) {
    switch (action.type) {
        case 'TASKS_LIST':
            return [...action.tasks];
        default:
            return state;
    }
}

function makeTaskMap(tasks) {
    let currMap = {};
    _.each(tasks, (task) => currMap[task.id] = task)
    return currMap
}

function tasksMap(state = [], action) {
    switch (action.type) {
        case 'TASKS_LIST':
            return makeTaskMap(action.tasks);
        default:
            return state;
    }
}

function isLoaded(state = [], action) {
    switch (action.type) {
        case 'LOADED':
            return true
        default:
            return false;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USERS_LIST':
            return [...action.users];
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", action);
    let reducer = combineReducers({ tasks, users, tasksMap, isLoaded });
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return state1
};

let store = createStore(root_reducer);
export default store;
