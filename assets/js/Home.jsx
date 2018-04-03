import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom'

function makeTable(tableName, rows, bgColor) {
    return (
        <Fragment>
            <h2>{tableName}</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Assignee</th>
                        <th>Timespent</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={bgColor}>
                    {rows}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default function Login({ tasks }) {
    let separate = {
        "COMPLETE": [],
        "INPROGRESS": [],
        "NOT STARTED": []
    };
    const showClasses = "btn btn-xs text-white";
    const editClasses = "btn btn-xs text-white";
    const deleteClasses = "btn btn-danger btn-xs text-white";
    const allRows = _.each(tasks, (task, index) => {
        const assignee = task.assignee ? task.assignee.username : null;
        const newRow = (
            <tr key={index}>
                <td>{task.status}</td>
                <td>{task.title}</td>
                <td>{task.owner.username}</td>
                <td>{assignee}</td>
                <td>{task.timespent}</td>
                <td className="text-right">
                    <span><Link className={showClasses} to={"/tasks/" + task.id}>Show</Link></span>
                    <span><Link className={editClasses} to={"/tasks/edit/" + task.id}>Edit</Link></span>
                    <span><Link className={deleteClasses} to={"/tasks/delete/" + task.id}>Delete</Link></span>
                </td>
            </tr>
        );
        separate[task.status].push(newRow);
    })

    const newClasses = "btn btn-xs btn-success";
    return (
        <Fragment>
            {makeTable("In progress Task", separate["INPROGRESS"], "bg-success")}
            {makeTable("Unstarted Task", separate["NOT STARTED"], "bg-warning")}
            {makeTable("Complete Task", separate["COMPLETE"], "bg-primary")}
            <span><Link className={newClasses} to="/tasks/new/">New Task</Link></span>
        </Fragment>
    );
}
