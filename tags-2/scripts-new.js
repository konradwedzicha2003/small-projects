let tagList = [
    {name: 'html', value: 'html'},
    {name: 'css', value: 'css'},
    {name: 'js', value: 'js'},
    {name: 'react', value: 'react'},
    {name: 'php', value: 'php'},
    {name: 'c++', value: 'c++'},
    {name: 'vue', value: 'vue'},
    {name: 'c', value: 'c'},
    {name: 'xd', value: 'xd'},
    {name: 'adhd', value: 'adhd'}]

const tagBoxInner = document.querySelector('.tag-box__inner');
const selectedTagListInner = document.querySelector('.selected-tags-list__inner');
const selectedTagsNumberOutput = document.querySelector(".number-of-selected-tags");
const searchInput = document.querySelector('.search__input');
let tagListCopy = tagList;
let selectedTagsList = [];
let showMoreOrLessValue;

searchInput.addEventListener('input', (e) => {

    tagListCopy = tagList.filter(el => el.name.includes(e.target.value))
    searchInput.value !== "" ? renderTags(tagBoxInner, tagListCopy, tagListCopy.length ) : renderTags(tagBoxInner, tagList, 4,"Show more", true)
})

const onClickEvent = value => {
    tagList = tagList.map(el => ({
        ...el,
        isSelected: el.value === value.target.value ? !el?.isSelected : el?.isSelected
    }))

    tagListCopy = tagList.filter(el => el.name.includes(searchInput.value))

    selectedTagsList = [];

    tagList.forEach(tagListEl => {

        if (tagListEl.isSelected === true) {

            selectedTagsList.push(tagListEl)
        }
    })

    if (searchInput.value === "" ) {

        if (showMoreOrLessValue === "Show more") {
            renderTags(tagBoxInner, tagList,4,"Show more", true)
        } else {
            renderTags(tagBoxInner, tagListCopy, tagListCopy.length,"Show less", true)
        }
    } else {
        renderTags(tagBoxInner, tagListCopy, tagListCopy.length)
    }

    renderTags(selectedTagListInner, selectedTagsList, selectedTagsList.length)
    updateNumberOfSelectedTags()
}

const renderTags = (box, array, number, btnInnerValue, createBtn) => {
    box.innerHTML = '';

    for (let i = 0; i < number; i++) {
        let tag = document.createElement('button');
        tag.value = array[i].value;
        tag.onclick = onClickEvent
        tag.className = array[i].isSelected ? 'active' : '';
        tag.classList.add("tag")
        tag.textContent = array[i].name;
        tag.dataset.isSelected = array[i].isSelected;

        if (array === selectedTagsList) {
            let removerBox = document.createElement("div")
            let remover = document.createElement("img")
            removerBox.classList.add("remove-img__box")
            remover.setAttribute("src", "assets/remove.png")
            remover.classList.add("remove-img")
            removerBox.appendChild(remover)
            tag.classList.add("selected-tags-list-element")
            tag.classList.remove("tag")
            tag.appendChild(removerBox)
        }

        box.appendChild(tag);
    }

    createBtn ? createShowMoreOrLessBtn(btnInnerValue) : ""
}

const updateNumberOfSelectedTags = () => {
    selectedTagsNumberOutput.textContent = "Tags " + selectedTagsList.length.toString()
}

const createShowMoreOrLessBtn = (innerValue) => {

    let btn = document.createElement("button")
    btn.onclick = buttonClickEvent
    btn.classList.add("show-more-or-less-btn")
    btn.innerHTML = innerValue
    showMoreOrLessValue = innerValue
    tagBoxInner.appendChild(btn)

}

const buttonClickEvent = button => {

    if (searchInput.value === "") {

        if (button.target.innerHTML === "Show more") {

            renderTags(tagBoxInner, tagList, tagList.length,"Show less", true)

        } else {

            renderTags(tagBoxInner, tagList, 4,"Show more", true)

        }
    }
}

renderTags(tagBoxInner, tagList, 4,"Show more", true)