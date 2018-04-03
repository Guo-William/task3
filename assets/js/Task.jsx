import React, { Fragment } from 'react';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task({ id, title, status, details, timespent, owner, assignee }) {
    const editClasses = "btn btn-xs btn-primary";
    const backClasses = "btn btn-xs btn-primary"
    const assigned = assignee ? assignee.username : null;
    return (
        <Fragment>
            <h2>Show Task</h2>
            <span><Link className={editClasses} to={"/task/edit/" + id}>Edit</Link></span>
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