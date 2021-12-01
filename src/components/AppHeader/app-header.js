import React from "react";
import './app-header.css'

const AppHeader = ({todo, done}) => {
    return (
        <div className='app-header d-flex'>
            <h1>ToDo List</h1>
            <h2>{done} need to be done, {todo} done</h2>
        </div>
    );
}
export default AppHeader