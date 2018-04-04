import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
    const router = <Router>
        <Fragment>
            <Route path="/" exact={true} render={() =>
                <Login {...props} />
            } />
            <Route path="/home" exact={true} render={() =>
                <Home {...props} />
            } />
            <Route path="/task/new/" exact={true} render={({ match }) =>
                <TaskEdit isNew={true} />
            } />
            <Route path="/task/show/:id" exact={true} render={({ match }) =>
                <Task {...props.tasksMap[match.params.id]} dispatch={props.dispatch} />
            } />
            <Route path="/task/edit/:id" exact={true} render={({ match }) =>
                <TaskEdit id={match.params.id} isNew={false} />
            } />
            <Route path="/register" exact={true} render={({ match }) =>
                <Register {...props} />
            } />
        </Fragment>
    </Router>
    let returnable = props.isLoaded ? router : null
    return returnable;
});

