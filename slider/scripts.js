let mainSliderContainer = document.querySelector("#mainSliderContainer");
let sliderElementsBox = document.createElement("div");
let sliderMenuBox = document.createElement("div");
let slideLeftArrow = document.createElement("div");
let slideRightArrow = document.createElement("div");
sliderElementsBox.classList.add("slider-elements-box");
sliderMenuBox.classList.add("slider-menu-box");
slideLeftArrow.classList.add("slide-left");
slideRightArrow.classList.add("slide-right");
let sliderArray = [];
let menuArray = [];
let clickedElements = [];
let leftRightSliders = [];
let allAnimationsArray = ["fadeInFromRightAnimation","fadeOutToRightAnimation","fadeInFromLeftAnimation","fadeOutToLeftAnimation"];
let currentClickedElementIndex;
let lastClickedElementIndex;
let lastClickedElement;
let counter = 0;
let root = document.querySelector(':root');
let sliderLength = 6;
let animationDuration = "0.8s";

root.style.setProperty('--animationDuration', animationDuration);

leftRightSliders.push(slideLeftArrow)
leftRightSliders.push(slideRightArrow)

function makeSliderElementsAndMenu () {

    for (let i = 0; i < sliderLength; i++) {

        let sliderElement = document.createElement("div");
        sliderElement.classList.add("slider-element");
        sliderElement.classList.add("hidden");
        sliderElementsBox.appendChild(sliderElement);
        sliderArray.push(sliderElement);
        sliderArray[i].innerHTML = "Content " + (i + 1);

        let sliderMenuElement = document.createElement("div");
        sliderMenuElement.classList.add("slider-menu-element");
        sliderMenuBox.appendChild(sliderMenuElement);
        menuArray.push(sliderMenuElement);
    }

    mainSliderContainer.appendChild(sliderElementsBox);
    mainSliderContainer.appendChild(sliderMenuBox);
    sliderElementsBox.firstChild.classList.remove("hidden");
    sliderElementsBox.appendChild(slideLeftArrow);
    sliderElementsBox.appendChild(slideRightArrow);

    menuArray[0].classList.add("slider-menu-element-clicked");
    clickedElements.push(menuArray[0]);
    currentClickedElementIndex = menuArray.indexOf(clickedElements[0]);

}

function delayNextSlide (nextSlideDelay) {

    if (nextSlideDelay.charAt(nextSlideDelay.length -1) === "s" && nextSlideDelay.charAt(1) === ".") {

        let delay = nextSlideDelay.replace("s", "00");
        return delay.replace(".", "");


    } else {

        let delay = nextSlideDelay.replace("s", "000");
        return delay

    }

}

function slideRightAnimation () {
    sliderArray[currentClickedElementIndex].classList.add("fadeInFromRightAnimation");
    sliderArray[lastClickedElementIndex].classList.add("fadeOutToLeftAnimation");
}

function slideLeftAnimation () {
    sliderArray[currentClickedElementIndex].classList.add("fadeInFromLeftAnimation");
    sliderArray[lastClickedElementIndex].classList.add("fadeOutToRightAnimation");
}

function removeAllAnimations (sliderElement){
    for (let i = 0; i < allAnimationsArray.length; i++) {

        sliderElement.classList.remove(allAnimationsArray[i])
    }
}

function menuSlideAnimation () {

    sliderArray.forEach(removeAllAnimations)

    if (currentClickedElementIndex > lastClickedElementIndex) {
        slideRightAnimation ()
    } else {
        slideLeftAnimation ()
    }
}

function leftOrRightSlideAnimation () {

    sliderArray.forEach(removeAllAnimations)

    if (currentClickedElementIndex > lastClickedElementIndex) {

        if (currentClickedElementIndex === (sliderArray.length -1) && lastClickedElementIndex === 0) {
            slideLeftAnimation ()
        } else {
            slideRightAnimation ()
        }

    } else {

        if (currentClickedElementIndex === 0 && lastClickedElementIndex === (sliderArray.length -1)) {
            slideRightAnimation ()
        } else {
            slideLeftAnimation ()
        }

    }

}

function changeSliderAndMenuStatus () {
    menuArray[currentClickedElementIndex].classList.add("slider-menu-element-clicked");
    menuArray[lastClickedElementIndex].classList.remove("slider-menu-element-clicked");
    sliderArray[currentClickedElementIndex].classList.remove("hidden");
    sliderArray[lastClickedElementIndex].classList.add("hidden");
}

function menuClickEventCall (menuElement) {

    menuElement.addEventListener("click", menuClickEvent);

    function menuClickEvent () {

        function clearAnimationTimeout() {
            counter = 0
        }

        if (counter === 0) {

            counter = 1

            if (!menuElement.classList.contains("slider-menu-element-clicked")) {

                clickedElements.push(menuElement);

                if (clickedElements.length > 1) {
                    lastClickedElement = clickedElements.shift();

                }

                currentClickedElementIndex = menuArray.indexOf(clickedElements[0]);

                lastClickedElementIndex = menuArray.indexOf(lastClickedElement);

                changeSliderAndMenuStatus()

                menuSlideAnimation()

            }

            setTimeout(clearAnimationTimeout, delayNextSlide(animationDuration) )

        }

    }

}

function slideLeftOrRightCall (arrow) {

    arrow.addEventListener("click", slideLeftOrRight);

    function slideLeftOrRight () {

        function clearAnimationTimeout() {
            counter = 0
        }

        if (counter === 0) {

            counter = 1

            if (arrow === slideLeftArrow) {

                lastClickedElementIndex = currentClickedElementIndex;

                if (currentClickedElementIndex === 0) {
                    currentClickedElementIndex = (sliderArray.length - 1);
                } else {
                    --currentClickedElementIndex
                }

                clickedElements.push(menuArray[currentClickedElementIndex]);

                if (clickedElements.length > 1) {
                    lastClickedElement = clickedElements.shift();

                }

                changeSliderAndMenuStatus()

                leftOrRightSlideAnimation()

            } else {

                lastClickedElementIndex = currentClickedElementIndex;

                if (currentClickedElementIndex === (sliderArray.length - 1)) {
                    currentClickedElementIndex = 0;
                } else {
                    ++currentClickedElementIndex

                }

                clickedElements.push(menuArray[currentClickedElementIndex]);

                if (clickedElements.length > 1) {
                    lastClickedElement = clickedElements.shift();

                }

                changeSliderAndMenuStatus()

                leftOrRightSlideAnimation()

            }

            setTimeout(clearAnimationTimeout, delayNextSlide(animationDuration) )

        }
    }
}

(function init () {
    makeSliderElementsAndMenu()
    menuArray.forEach(menuClickEventCall)
    leftRightSliders.forEach(slideLeftOrRightCall)

})()