let shoe = document.querySelector(".shoe-rotating");
let shoeBackground = document.querySelector(".shoe-background");
let searchIcon = document.querySelector("#searchIcon")
let search = document.querySelector("#search")

function mouseMoveAnimation (e) {
    let moveX = (e.clientX * -1 / 15);
    let moveY = (e.clientY * -1 / 15);
    let moveXShoe = (e.clientX * -1 / 35);
    let moveYShoe = (e.clientY * -1 / 35);

    function paralaxMove () {
        shoeBackground.style.transform = "translateX(" + moveX + "px" + ") translateY(" + moveY + "px" + ")"
        shoe.style.transform = "translateX(" + moveXShoe + "px" + ") translateY(" + moveYShoe + "px" + ")"
    }

    paralaxMove ()

}

function searchExpand () {
    searchIcon.classList.add("hidden")
    search.classList.remove("hidden")
    search.classList.add("search-expand-animation")
}

function searchMouseOut () {
    searchIcon.classList.remove("hidden")
    search.classList.add("hidden")
}

(function init () {
    document.body.addEventListener('mousemove', mouseMoveAnimation)
    searchIcon.addEventListener("click", searchExpand)
    search.addEventListener("mouseout", searchMouseOut)
})()

