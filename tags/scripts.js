const allTags = document.querySelectorAll(".tag");
const allSelectedTagsList = document.querySelectorAll(".selected-tags-list-element");
const selectedTagsNumberOutput = document.querySelector(".number-of-selected-tags");
const showMoreOrLessBtn = document.querySelector(".show-more-or-less")
const searchInput = document.querySelector(".search__input");
let currentClickedTag;
let selectedTagsArray = [];
let deleteTagIndex;
let selectedTagsListArray = [];
let selectedTagDataContent;
let tagTextContent;
let selectedTagIndex;
let selectedTagsNumber;

function selectTagCall(tag) {

    tag.addEventListener("click", selectTag);

    function selectTag() {

        currentClickedTag = tag;

        tagTextContent = currentClickedTag.textContent;

        if (currentClickedTag.classList.contains("tag--selected")) {

            matchTags();

            hideTags (currentClickedTag);

        } else {

            matchTags();

            showTags();
        }
    }
}

function hideTagsSelectedCall (selectedTag) {

    selectedTag.addEventListener("click", hideTagsSelected)

    function hideTagsSelected() {

        currentClickedTag = selectedTag;
        selectedTagDataContent = currentClickedTag.dataset.tagContent;

        matchTagsSelected();

        hideTags(allTags[selectedTagIndex])
    }
}

function matchTagsSelected() {

    for (let i = 0; i < allSelectedTagsList.length; i++) {

        tagTextContent = allTags[i].textContent;

        if (tagTextContent === selectedTagDataContent) {
            selectedTagIndex = selectedTagsListArray.indexOf(allSelectedTagsList[i]);
            return
        }
    }
}

function matchTags() {

    for (let i = 0; i < allSelectedTagsList.length; i++) {

        selectedTagDataContent = allSelectedTagsList[i].dataset.tagContent;

        if (tagTextContent === selectedTagDataContent) {
            selectedTagIndex = selectedTagsListArray.indexOf(allSelectedTagsList[i]);
            return
        }
    }
}

function showTags () {

    allSelectedTagsList[selectedTagIndex].classList.remove("hidden");
    selectedTagsArray.push(currentClickedTag);

    updateSelectedTagsNumber ()

    currentClickedTag.classList.add("tag--selected");
}

function hideTags (chosenTag) {

    deleteTagIndex = selectedTagsArray.indexOf(chosenTag);
    selectedTagsArray.splice(deleteTagIndex, 1);

    updateSelectedTagsNumber ()

    chosenTag.classList.remove("tag--selected");
    allSelectedTagsList[selectedTagIndex].classList.add("hidden");
}

function makeSelectedTagsListArray() {
    for (let i = 0; i < allSelectedTagsList.length; i++) {
        selectedTagsListArray.push(allSelectedTagsList[i]);
    }
}

function updateSelectedTagsNumber () {
    selectedTagsNumber = selectedTagsArray.length;
    selectedTagsNumberOutput.textContent = "Tags " + selectedTagsNumber;
}

function showOnly4Tags() {
    if (allTags.length > 4) {
        for (let i = 4; i < allTags.length; i++) {
            allTags[i].classList.add("hidden");
        }
        for (let i = 0; i < 4; i++) {
            allTags[i].classList.remove("hidden");
        }
    }
}

function showMoreOrLessTags () {

    if (showMoreOrLessBtn.textContent === "Show less") {

        for (let i = 4; i < allTags.length; i++) {
            allTags[i].classList.add("hidden");
        }
        showMoreOrLessBtn.textContent = "Show more";

    } else {

        for (let i = 4; i < allTags.length; i++) {
            allTags[i].classList.remove("hidden");
        }
        showMoreOrLessBtn.textContent = "Show less";
    }
}

function hideOrShowMoreLessBtn () {

    if (searchInput.value.length === 0) {
        showMoreOrLessBtn.classList.remove("show-more-or-less--hidden");
    } else {
        showMoreOrLessBtn.classList.add("show-more-or-less--hidden");
    }
}

function filter () {

    for (let i = 0; i < allTags.length; i++) {

            if (allTags[i].textContent.search(searchInput.value.toLowerCase()) < 0) {

                allTags[i].classList.add("hidden");
                hideOrShowMoreLessBtn();

            } else {

                if (searchInput.value.length === 0) {


                    showOnly4Tags();
                    showMoreOrLessBtn.textContent = "Show more";
                    hideOrShowMoreLessBtn();

                } else {


                    allTags[i].classList.remove("hidden");
                    hideOrShowMoreLessBtn();

                }
            }
    }
}

(function init() {
    makeSelectedTagsListArray();
    allTags.forEach(selectTagCall);
    allSelectedTagsList.forEach(hideTagsSelectedCall);
    showOnly4Tags();
    showMoreOrLessBtn.addEventListener("click", showMoreOrLessTags);
    searchInput.addEventListener("input", filter)

})()