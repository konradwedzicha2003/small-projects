let progressBar = document.querySelector("#progressBar");

let i = 1;

let progress = function () {

    console.log(i)
    return progressBar.value = i++

}

setInterval(progress, 1000)

