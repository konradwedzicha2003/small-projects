(function(){
    var btn = document.querySelector("#getNumbers"),
        output = document.querySelector("#showNumbers");

    function getRandom(min, max) {

        return Math.round(Math.random() * (max - min) + min);

    }



    function showRandomNumbers() {

        var numbers = [],
            repeatedNumbers = [],
            random;

            for (var i = 0; i < 6; i++) {

                random = getRandom(1, 49);

                while (numbers.indexOf(random) !== -1) {

                        random = getRandom(1, 49);
                        console.log(random);
                        repeatedNumbers.push(random);

                }

                numbers.push(random)
            }

        output.value = numbers.join(", ");
        window.repeatedNumbers = repeatedNumbers

    }

    btn.onclick = showRandomNumbers;


})();
