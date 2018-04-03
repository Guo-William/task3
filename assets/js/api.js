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
        $.ajax("/api/v1/tasks", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ task: data }),
        });
    }
}

export default new TheServer();
