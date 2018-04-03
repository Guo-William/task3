import React, { Fragment } from 'react';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task({ id, title, status, details, timespent, owner, assignee, dispatch }) {
    const editClasses = "btn btn-xs btn-primary";
    const backClasses = "btn btn-xs btn-primary";
    const assigned = assignee ? assignee.username : null;
    function edit() {
        let data = {
            status: status,
            title: title,
            details: details || "",
            assignee_id: assignee ? assignee.id : "",
            timespent: timespent,
            owner_id: owner.id,
            id: id
        };
        let action = {
            type: 'UPDATE_TASK_FORM',
            data: data,
        };
        let clearAction = {
            type: 'CLEAR_TASK_FORM',
        }
        const promise = new Promise(function (resolve, reject) {
            dispatch(clearAction)
        }).then(dispatch(action));
    }


    return (
        <Fragment>
            <h2>Show Task</h2>
            <span><Link onClick={edit} className={editClasses} to={"/task/edit/" + id}>Edit</Link></span>
            <ul className="list-unstyled">
                <li>
                    <strong>Title:</strong>{title}
                </li>
                <li>
                    <strong>Status:</strong>{status}
                </li>
                <li>
                    <strong>Details:</strong>{details}
                </li>
                <li>
                    <strong>Timespent:</strong>{timespent}
                </li>
                <li>
                    <strong>Owner:</strong>{owner.username}
                </li>
                <li>
                    <strong>Assignee:</strong>{assigned}
                </li>
            </ul>
            <span><Link className={backClasses} to="/home">Back</Link></span>
        </Fragment>
    );
}