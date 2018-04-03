import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';

export default function Login() {
  return (
    <Fragment>
      <h1 className="text-center"> Welcome to TaskTracker! </h1>
      <div className="row">
        <div className="col-4 offset-4 text-center login-box">
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" value="" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="text" name="password" value="" />
            </FormGroup>
            <Button onClick={() => null}>Log In</Button>
            <FormGroup>
              <NavLink to="/register" href="#">Register</NavLink>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}



