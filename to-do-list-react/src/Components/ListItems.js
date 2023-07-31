import React from 'react';

const ListItems = ({listItems, removeTask, changeOrder}) => {

    const mappedListItems = listItems.map((el,index) => {

        el.index = index;
        index += 1;

        return (
            <li id={el.id} key={el.id}>
                <span className="order">{index}.</span>
                <span className="task-value">{el.value}</span>
                <div className="functional-buttons">
                    <div className="change-order-buttons">
                        {index > 1 ? <div className="arrow arrow__up" onClick={changeOrder}/> : ""}
                        {index !== listItems.length ? <div className="arrow arrow__down" onClick={changeOrder}/> : ""}
                    </div>
                <div onClick={removeTask} className="remove-task">
                    <div className="remove-task__line remove-task__line--line-up"/>
                    <div className="remove-task__line remove-task__line--line-down"/>
                </div>
                </div>
            </li>
        )
    }
    )

    return (
        mappedListItems.length > 0 ?
        <ol>
            {mappedListItems}
        </ol>
            : null
    )
}

export default ListItems