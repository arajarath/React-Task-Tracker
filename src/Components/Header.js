import React from 'react'
import { PropTypes } from "prop-types";
import Button from "./Button";
import {useLocation } from 'react-router-dom';
const Header = ({title, onAddTask, onShowAdd}) => {

    const location = useLocation();
    return (
        <div className="header">
           <h1>{title}</h1>
           {location.pathname === '/' && <Button
           color={onShowAdd ? 'red ' : 'green'}
            onClick={onAddTask}
            text={!onShowAdd ? 'Click to Add Task ' : 'Close'}
            style/>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string
}
export default Header
