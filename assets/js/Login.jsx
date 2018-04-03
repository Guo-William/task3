import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
    console.log(loginForm);
  }


  let session_info;

  if (token) {
    session_info = <h1>Already Logged in! {token.user_id}</h1>
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
            <Button onClick={create_token}>Log In</Button>
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



