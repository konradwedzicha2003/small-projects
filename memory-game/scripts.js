

    let mainContainer = document.getElementById("main-container"),
        gridBox = document.createElement("div"),
        gridArray = [];

    gridBox.classList.add("gridBox");

    mainContainer.appendChild(gridBox);

    for (let i = 0; i < 10; i++) {

        let gridRow = document.createElement("div");
        gridRow.classList.add("gridRow");
        gridBox.appendChild(gridRow);

        for (let i = 0; i < 10; i++) {

            let gridElement = document.createElement("div");

            gridElement.classList.add("grid");
            gridArray.push(gridElement);
            gridRow.appendChild(gridElement);

        }

    }

    let wrongMatchesCounterBox = document.createElement("div"),
        wrongMatchesCounter = document.createElement("output"),
        wrongMatchesCounterDescription = document.createElement("div");

    wrongMatchesCounterBox.appendChild(wrongMatchesCounter)
    wrongMatchesCounterBox.appendChild(wrongMatchesCounterDescription)

    wrongMatchesCounterDescription.textContent = "Błędne próby";

    wrongMatchesCounterBox.classList.add("wrongMatches");

    wrongMatchesCounter.value = "0"

    mainContainer.appendChild(wrongMatchesCounterBox);

    function shuffleArray(a, b) {

        let random1 = Math.round( Math.random() * (10 - 1) + 1 );
        let random2 = Math.round( Math.random() * (10 - 1) + 1 );

        return random1 - random2;

    }

    let gridUnfoldedNumbers = [];

    for (let y = 0; y < 2; y++) {

        for (let i = 1; i < 51; i++) {
            gridUnfoldedNumbers.push(i)
        }
    }

    (function gridNumbers () {
        gridUnfoldedNumbers.sort(shuffleArray)

        return gridUnfoldedNumbers

    })()

    for (let i = 0; i < gridArray.length; i++) {
        let gridNumber = document.createElement("div")
        gridNumber.style.display = "none"
        gridNumber.textContent = gridUnfoldedNumbers[i]
        gridArray[i].appendChild(gridNumber)

    }

    let gridNumbersArray = [],
        matchedNumbers = [],
        wrongMatches = [];

    gridArray.forEach(clickEventCall)

    function clickEventCall (gridArrayElement){

        gridArrayElement.addEventListener("click", clickEvent)

        function clickEvent () {

            if (gridArrayElement.classList.contains("matchedNumbersColor")) {

            } else {

                if (gridArrayElement.classList.contains("unfolded")) {

                } else {

                    if (gridNumbersArray.length <= 1) {

                        gridArrayElement.classList.add("unfolded");
                        gridArrayElement.classList.add("gridUnfolded");
                        gridNumbersArray.push(gridArrayElement);

                        function removeUnfoldAnimation() {
                            gridArrayElement.classList.remove("gridUnfolded");

                        }

                        function showUnfoldedNumber() {
                            gridArrayElement.firstChild.style.display = "block"

                        }

                        setTimeout(showUnfoldedNumber, 200);
                        setTimeout(removeUnfoldAnimation, 800);

                        if (gridNumbersArray.length === 2) {

                            setTimeout(hideUnfoldedNumber, 2000);

                            if (gridNumbersArray[0].firstChild.textContent === gridNumbersArray[1].firstChild.textContent) {

                            matchedNumbers.push(gridNumbersArray[1]);
                            matchedNumbers.push(gridNumbersArray[0]);
                            gridNumbersArray[0].classList.add("matchedNumbersColor");
                            gridNumbersArray[1].classList.add("matchedNumbersColor");

                            }

                            if (gridNumbersArray[0].firstChild.textContent !== gridNumbersArray[1].firstChild.textContent) {
                                wrongMatches.push(gridArrayElement);
                            }

                        }

                        function hideUnfoldedNumber() {

                            if (gridNumbersArray.length >= 2) {

                                    gridNumbersArray[0].classList.remove("unfolded");
                                    gridNumbersArray[1].classList.remove("unfolded");
                                    gridNumbersArray[0].firstChild.style.display = "none";
                                    gridNumbersArray[1].firstChild.style.display = "none";
                                    gridNumbersArray = [];

                            }

                        }

                    }
    
                }

            }

            wrongMatchesCounter.value = wrongMatches.length.toString();

            if (matchedNumbers.length === 100) {
                alert("Brawo!")

            }

        }


    }



