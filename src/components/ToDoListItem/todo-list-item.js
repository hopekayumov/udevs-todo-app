import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './todo-list-item.css'

export default class TodoListItem extends Component {
    render() {
        const {label, onDelete, onToggleImportant, onToggleDone, done, important} = this.props
        let classNames ='todo-list-item'
        if (done) {
            classNames += 'done'
        }
        if (important) {
            classNames += 'important'
        }
        return (
            <span className={classNames}>
                <span className='todo-list-item-label'
                onClick={onToggleDone}>
                    {label}
                </span>
                <button type='button' className='btn btn-outline-primary btn-sm float-right'
                onClick={onToggleImportant}>
                    <FontAwesomeIcon icon={faExclamation}></FontAwesomeIcon>
                </button>
                <button type='button' className='btn btn-outline-danger btn-sm  float-right'
                        onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </button>
            </span>
        );
    }
}