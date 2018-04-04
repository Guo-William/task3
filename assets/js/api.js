import store from './store';

class TheServer {
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
            },
        });
    }

    create_user(data) {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ user: data })
        });
    }
}

export default new TheServer();
