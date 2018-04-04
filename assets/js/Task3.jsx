import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Task from './Task';
import TaskEdit from './TaskEdit';
import Register from './Register';

export default function task3_init(store) {
    let root = document.getElementById('root');
    ReactDOM.render(
        <Provider store={store}>
            <Task3 state={store.getState()} />
        </Provider>,
        root
    );
}

let Task3 = connect((state) => state)((props) => {
    if (!props.isLoaded) {
        return null
    }

    function log_out() {
        let action = {
            type: 'LOGOUT',
        };
        props.dispatch(action)
    }

    let bar = <Fragment />;
    if (props.token) {
        bar = (
            <div className="row">
                <span>
                    Welcome {props.usersMap[props.token.user_id].username}!
                    <Link onClick={log_out} to="#"> | Log Out</Link>
                </span>
            </div>
        )
    }

    const router = <Router>
        <Fragment>
            {bar}
            <Route path="/" exact={true} render={() =>
                props.token
                    ? <Redirect to="/home" />
                    : <Login {...props} />
            } />
            <Route path="/home" exact={true} render={() =>
                props.token ? <Home {...props} /> : <Redirect to="/" />
            } />
            <Route path="/task/new/" exact={true} render={({ match }) =>
                props.token ? <TaskEdit isNew={true} /> : <Redirect to="/" />
            } />
            <Route path="/task/show/:id" exact={true} render={({ match }) =>
                props.token
                    ? <Task {...props.tasksMap[match.params.id]} dispatch={props.dispatch} />
                    : <Redirect to="/" />
            } />
            <Route path="/task/edit/:id" exact={true} render={({ match }) =>
                props.token
                    ? <TaskEdit id={match.params.id} isNew={false} />
                    : <Redirect to="/" />
            } />
            <Route path="/register" exact={true} render={({ match }) =>
                <Register {...props} />
            } />
        </Fragment>
    </Router>
    return router;
});

