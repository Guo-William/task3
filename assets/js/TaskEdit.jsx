import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from './api';

function TaskEdit(props) {
    let usersList = _.map(props.users, (user) => <option key={user.id} value={user.id}>{user.username}</option>);

    let data = {
        status: props.taskForm.status,
        title: props.taskForm.title,
        details: props.taskForm.details,
        assignee_id: props.taskForm.assignee_id || "",
        timespent: props.taskForm.timespent || "",
        owner_id: props.taskForm.owner_id,
        id: props.taskForm.id,
    };

    function update(ev) {
        let target = $(ev.target);

        data[target.attr('name')] = target.val();
        let action = {
            type: 'UPDATE_TASK_FORM',
            data: data,
        };
        props.dispatch(action);
    }

    function submit(ev) {
        api.update_task(data);
    }

    return (
        <Fragment>
            <h2>{props.isNew ? "New task" : "Edit task"}</h2>
            <Form>
                <FormGroup className="col-2">
                    <Label for="status">status</Label>
                    <Input type="select" name="status" value={props.taskForm.status} onChange={update}>
                        <option value="NOT STARTED">NOT STARTED</option>
                        <option value="COMPLETE">COMPLETE</option>
                        <option value="INPROGRESS">INPROGRESS</option>
                    </Input>
                </FormGroup>
                <FormGroup className="col-2">
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" value={props.taskForm.title} onChange={update} />
                </FormGroup>
                <FormGroup className="col-12">
                    <Label for="details">Details</Label>
                    <Input type="textarea" name="details" value={props.taskForm.details} onChange={update} />
                </FormGroup>
                <FormGroup className="col-4">
                    <Label for="assignee">Assignee</Label>
                    <Input type="select" name="assignee" value={props.taskForm.assignee_id} onChange={update}>
                        <option></option>
                        {usersList}
                    </Input>
                </FormGroup>
                <FormGroup className="col-2">
                    <Label for="timespent">Time spent</Label>
                    <Input type="number" name="timespent" value={props.taskForm.timespent || ""} onChange={update} />
                </FormGroup>
                <FormGroup>
                    <Link className="btn btn-primary" onClick={submit} to="/home">Submit</Link>
                </FormGroup>
                <span><Link className="btn btn-xs btn-primary" to="/home">Back</Link></span>
            </Form>
        </Fragment>
    );
}

function state2props(state) {
    return state;
}

export default connect(state2props)(TaskEdit);