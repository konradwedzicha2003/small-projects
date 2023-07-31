import React, { useState } from 'react';
import ListItems from './ListItems';
import '../style/style.css'
import Input from './Input'
import Button from "./Button";
import uniqid from 'uniqid'

const ToDoList = () => {

    const [list, setList] = useState([])
    const [inputValue, setInputValue] = useState("")

    const onClickHandler = () => {

        if (inputValue !== "") {
            const updatedList = [...list];

            if (updatedList.some(el => el.value === inputValue)) {
                alert("You already saved that task!");
            }

            updatedList.push({
                value: inputValue,
                index: updatedList.length,
                id: uniqid()
            })

            setList(updatedList);
            setInputValue('');
        }
    };

    const inputHandler = e => {
        setInputValue(e.target.value)
    };

    const onEnterHandler = e => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    };

    const findIndex = (array, idPath) => {
        let currentIndex;
        const currentId = idPath;
        const removedEl = array.find(el => el.id === currentId);
        currentIndex = array.indexOf(removedEl);

        return currentIndex
    }

    const removeTaskHandler = e => {
            const newReducedList = [...list]
            const currentIndex = findIndex(newReducedList, e.target.parentNode.parentNode.id)

            newReducedList.splice(currentIndex, 1)
            setList(newReducedList)
            setInputValue('')
    }

    const changeOrderHandler = e => {
        const newOrderList = [...list];
        let currentIndex = findIndex(newOrderList, e.target.parentNode.parentNode.parentNode.id);

        const newListEl = {
            value: newOrderList[currentIndex].value,
            index: '',
            id: uniqid()
        }

        newOrderList.splice(currentIndex, 1);
        newOrderList.splice(e.target.classList.contains("arrow__up") ? --currentIndex : ++currentIndex, 0, newListEl);
        setList(newOrderList);
    }

    return (
        <div
            className="container">
            <header>To do list</header>
            <Input inputHandler={inputHandler} onEnterHandler={onEnterHandler} inputValue={inputValue}/>
            <Button onClickHandler={onClickHandler}/>
            <ListItems listItems={list} removeTask={removeTaskHandler} changeOrder={changeOrderHandler}/>
        </div>
    )
}

export default ToDoList