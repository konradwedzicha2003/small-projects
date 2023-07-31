import React from 'react'

const Input = ({inputHandler, onEnterHandler, inputValue }) => {

        return (
        <input
            type='text'
            onChange={inputHandler}
            onKeyPress={onEnterHandler}
            value={inputValue}
        />
        )
}

export default Input