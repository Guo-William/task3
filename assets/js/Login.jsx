import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import api from './api';

export default function Login({ loginForm, dispatch, token }) {
  function update(ev) {
    let target = $(ev.target);
    let data = {};
    data[target.attr('name')] = target.val();
    dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    ev.preventDefault();
    api.submit_login(loginForm);
  }


  let session_info;
  const backClasses = "btn btn-xs btn-primary";
  if (token) {
    session_info = (
      <Fragment>
        <h1 className="text-center">Already Logged in! {token.user_id}</h1>
        <div className="row">
          <div className="col-4 offset-4 text-center">
            <span><Link className={backClasses} to="/home">Home</Link></span>
          </div>
        </div>
      </Fragment>
    );
  }
  else {
    session_info = <Fragment>
      <h1 className="text-center"> Welcome to TaskTracker! </h1>
      <div className="row">
        <div className="col-4 offset-4 text-center login-box">
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" name="email" value={loginForm.email} onChange={update} />
            </FormGroup>
            <FormGroup>
              <Label for="pass">Password</Label>
              <Input type="password" name="pass" value={loginForm.pass} onChange={update} />
            </FormGroup>
            <Link className={backClasses} onClick={create_token} to="/home">Home</Link>
            <FormGroup>
              <NavLink to="/register" href="#">Register</NavLink>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Fragment>
  }

  return session_info;
}



