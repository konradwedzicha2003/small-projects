import React from 'react'

const Button = ({onClickHandler}) => {
    return (
        <button
            onClick={onClickHandler}
            type="button">
            Add
        </button>
    )
}

export default Button