import store from './store';

class TheServer {
    // Taken from https://github.com/NatTuck/microblog-spa and
    // changed for my needs
    request_data() {
        $.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    tasks: resp.data,
                });
            },
        }).then($.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'USERS_LIST',
                    users: resp.data,
                })
            },
        }).then(() =>
            store.dispatch({
                type: 'LOADED'
            })
        ))
    }

    update_task(data) {
        $.ajax(`/api/v1/tasks/${data.id}`, {
            method: "patch",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ task: data }),
        }).then($.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    tasks: resp.data,
                });
            },
        }));
    }

    create_task(data) {
        $.ajax("/api/v1/tasks", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ task: data }),
        }).then($.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    tasks: resp.data,
                });
            },
        }));
    }



    delete_task(id) {
        $.ajax(`/api/v1/tasks/${id}`, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }).then($.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'TASKS_LIST',
                    tasks: resp.data,
                });
            },
        }));
    }

    submit_login(data) {
        $.ajax("/api/v1/token", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: resp,
                });
                store.dispatch({
                    type: 'CLEAR_ALERT',
                })
            },
            error: (resp) => {
                store.dispatch({
                    type: 'SHOW_BAD_LOG',
                })
            }
        }).then($.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'USERS_LIST',
                    users: resp.data,
                })
            },
        }));
    }

    create_user(data) {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ user: data }),
            success: (resp) => {
                store.dispatch({
                    type: 'CLEAR_ALERT'
                })
            },
            error: (resp) => {
                store.dispatch({
                    type: 'SHOW_BAD_REG',
                });
            }
        });
    }
}

export default new TheServer();
