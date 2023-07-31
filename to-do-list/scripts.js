const addListElInput = document.querySelector(".add-list-element__input");
const addListElBtn = document.querySelector(".add-list-element__btn");
const toDoList = document.querySelector(".to-do-list");
let toDoListArray = [];
let changeOrderArrowsArray = [];
let changeOrderArrowsPseudoArray;
let numberOfArrows;
let changeOrderArrowIndex;
let removeListElIndex;
let toDoListArrNewEl;
let removeListElPseudoArray;
let removeListElArray = [];

const makeArray = (iterArr, pushArr, pushEl) => {
    for (let i = 0; i < iterArr; i++) {
        pushArr.push(pushEl[i])
    }
}

const clickEvent = () => {
    if (addListElInput.value !== "") {

        let listElement = {}
        listElement.value = addListElInput.value
        listElement.name = addListElInput.value
        toDoListArray.push(listElement)
        renderList()
        addListElInput.value = ""
    }
}

const clickEventEnter = (e) => {
    e.key === 'Enter' ? clickEvent() : ""
}

const renderList = () => {
    toDoList.innerHTML = ""

    for (let i = 0; i < toDoListArray.length; i++) {
        let listElement = document.createElement("div")
        listElement.classList.add("to-do-list__element")
        listElement.innerHTML =
        `<span class="to-do-list__element-index">${toDoListArray.indexOf(toDoListArray[i]) + 1}</span>

        <p class="to-do-list__element-value">${toDoListArray[i].value}</p>
        
        <div class="to-do-list__functional-buttons" data-index="${toDoListArray.indexOf(toDoListArray[i])}">
        
            <div class="change-order-buttons">
            ${(toDoListArray.indexOf(toDoListArray[i]) + 1) !== 1 ? `<div class="arrow arrow__up"></div>` : ""} 
            ${(toDoListArray.indexOf(toDoListArray[i]) + 1) !== toDoListArray.length ? `<div class="arrow arrow__down"></div>` : ""} 
            </div>

            <span class="remover">
                <span class="remover__line remover__line--1"></span>
                <span class="remover__line remover__line--2"></span>
            </span>
        </div>`

        toDoList.appendChild(listElement)
    }

    if ( toDoListArray.length !== 0) {

        changeOrderArrowsPseudoArray = document.querySelectorAll(".arrow__up, .arrow__down")
        numberOfArrows = changeOrderArrowsPseudoArray.length
        changeOrderArrowsArray = [];

        makeArray(numberOfArrows, changeOrderArrowsArray, changeOrderArrowsPseudoArray)

        changeOrderArrowsArray.forEach(changeOrderArrow => {
            changeOrderArrow?.addEventListener("click", changeOrderUp)
        })
    }

    removeListElPseudoArray = document.querySelectorAll(".remover")
    makeArray(removeListElPseudoArray.length, removeListElArray, removeListElPseudoArray)

    removeListElArray.forEach(remover => {
        remover?.addEventListener("click", removeListEl)
    })
}

const changeOrderUp = (changeOrderArrow) => {

    changeOrderArrowIndex = changeOrderArrow.target.parentNode.parentNode.dataset.index

    toDoListArrNewEl = {
        value: toDoListArray[changeOrderArrowIndex].value,
        name: toDoListArray[changeOrderArrowIndex].name
    }

    toDoListArray.splice(changeOrderArrowIndex,1)
    toDoListArray.splice(changeOrderArrow.target.classList.contains("arrow__up") ? --changeOrderArrowIndex : ++changeOrderArrowIndex,0, toDoListArrNewEl)
    renderList()
}

const removeListEl = (remover) => {
    removeListElIndex = remover.target.parentNode.dataset.index
    toDoListArray.splice(removeListElIndex,1)
    renderList()
}

(function init () {
    addListElBtn.addEventListener("click", clickEvent)
    addListElInput.addEventListener("keydown", clickEventEnter)
})()
