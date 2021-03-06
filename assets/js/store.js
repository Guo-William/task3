import { createStore, combineReducers } from 'redux';

// Parts of this taken from https://github.com/NatTuck/microblog-spa and
// changed for my needs

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

function makeUserMap(users) {
    let currMap = {};
    _.each(users, (user) => currMap[user.id] = user)
    return currMap
}

function usersMap(state = [], action) {
    switch (action.type) {
        case 'USERS_LIST':
            return makeUserMap(action.users);
        default:
            return state;
    }
}

let emptyTaskForm = {
    assignee_id: "",
    details: "",
    status: "NOT STARTED",
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
        case 'LOGOUT':
            return null
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
        case 'CLEAR_LOGIN_FORM':
            return empty_login_form;
        default:
            return state;
    }
}

let empty_registration_form = {
    name: "",
    email: "",
    pass: "",
};

function registrationForm(state = empty_registration_form, action) {
    switch (action.type) {
        case 'UPDATE_REGISTRATION_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_REGISTRATION_FORM':
            return empty_registration_form;
        default:
            return state;
    }
}

function alert(state = "", action) {
    switch (action.type) {
        case 'SHOW_BAD_REG':
            return "One of the registration fields was bad Please try again"
        case 'SHOW_BAD_LOG':
            return "Incorrect login information!"
        case 'CLEAR_ALERT':
            return "";
        default:
            return state;
    }
}



function root_reducer(state0, action) {
    let reducer = combineReducers({
        tasks,
        users,
        tasksMap,
        isLoaded,
        taskForm,
        token,
        loginForm,
        registrationForm,
        usersMap,
        alert
    });
    let state1 = reducer(state0, action);
    return state1
};

let store = createStore(root_reducer);
export default store;

