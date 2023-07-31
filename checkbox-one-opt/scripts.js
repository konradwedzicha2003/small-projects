const options = document.querySelectorAll("input[type=radio]");
const btn = document.querySelector(".button");
const pickedValue = document.querySelector(".picked-value");
let pickedOption = options[0].value;

const pickOptionCall = (option) => {
    option.addEventListener("click", pickOption)
}

const pickOption = (e) => {
    pickedOption = e.target.value
}

const showSelectedOption = () => {
    pickedValue.innerHTML = pickedOption;
}

(function init () {
    options.forEach(pickOptionCall);
    btn.addEventListener("click", showSelectedOption);
})()


