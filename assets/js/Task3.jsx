import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Home from './Home';

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
    return (
        <Router>
            <Fragment>
                <Route path="/" exact={true} render={() =>
                    <Login />
                } />
                <Route path="/home" exact={true} render={() =>
                    <Home {...props} />
                } />
            </Fragment>
        </Router>
    );
});

