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

function isLoaded(state = false, action) {
    switch (action.type) {
        case 'LOADED':
            return true
        default:
            return state
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

let emptyTaskForm = {
    assignee_id: "",
    details: "",
    status: "",
    timespent: "",
    title: "",
};


function taskForm(state = emptyTaskForm, action) {
    switch (action.type) {
        case 'CLEAR_TASK_FORM':
            return emptyTaskForm;
        case 'UPDATE_TASK_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function token(state = null, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token;
        default:
            return state;
    }
}

let empty_login_form = {
    email: "",
    pass: "",
};

function loginForm(state = empty_login_form, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", action);
    let reducer = combineReducers({
        tasks,
        users,
        tasksMap,
        isLoaded,
        taskForm,
        token,
        loginForm
    });
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return state1
};

let store = createStore(root_reducer);
export default store;

