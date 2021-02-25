import React from 'react'
import PropTypes from 'prop-types'
const Button = ({color, text, onClick}) => {


    return (
        <div>
           <button 
           style={{backgroundColor: color,
            cursor: 'pointer'}}
            className="btn" 
            onClick={onClick}>{text} 
            </button> 
        </div>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func
}
Button.defaultProps = {
    text : 'Add Task'
}

export default Button
