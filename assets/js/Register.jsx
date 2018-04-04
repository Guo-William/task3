import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import api from './api';

export default function Register({ registrationForm, dispatch }) {
    function submit(ev) {
        api.update_task(data);
    }

    function update(ev) {
        let target = $(ev.target);
        let data = {};
        data[target.attr('name')] = target.val();
        dispatch({
            type: 'UPDATE_REGISTRATION_FORM',
            data: data,
        });
    }

    const data = {
        username: registrationForm.name,
        email: registrationForm.email,
        password: registrationForm.pass,
    }

    function submit() {
        api.create_user(data)
        dispatch({
            type: 'CLEAR_REGISTRATION_FORM',
        });
    }

    return (<Fragment>
        <h1 className="text-center"> Register </h1>
        <div className="row">
            <div className="col-4 offset-4 text-center login-box">
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" value={registrationForm.name} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" value={registrationForm.email} onChange={update} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pass">Password</Label>
                        <Input type="password" name="pass" value={registrationForm.pass} onChange={update} />
                    </FormGroup>
                    <Link onClick={submit} to={"/"}>Register</Link>
                </Form>
            </div>
        </div>
    </Fragment>);
}





{/* <div class="form-group col-auto">
    <%= label f, :email, class: "control-label" %>
    <%= text_input f, :email, class: "form-control" %>
    <%= error_tag f, :email %>
  </div>

  <div class="form-group col-auto">
    <%= label f, :username, class: "control-label" %>
    <%= text_input f, :username, class: "form-control" %>
    <%= error_tag f, :username %>
  </div>

  <div class="form-group col-auto">
    <%= submit "Submit", class: "btn btn-primary" %>
  </div> */}