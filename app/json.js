document.addEventListener("DOMContentLoaded", element => {
    const gridSystem = 12;
    const elementForEachRow = 6;
    //VARIABLES
    var rqt = new Request('json/class.json');
    var classe = [];
    var body = document.querySelectorAll('.grid-y');
    var selector;

    function creaTavoli() {

        function createWrapper() {
            body = document.querySelector('.grid-y');
            body.innerHTML += '<div class="cell grid-x grid-margin-x"></div>';
        }

        function createRow(stateOfRow) {
            body = document.querySelectorAll('.grid-x');
            if (stateOfRow == "normal") {
                body[body.length - 1].innerHTML += '<div class="cell medium-2 large-2 small-2"></div>';
            } else {
                var offsetSmall = "small-offset-"+ (stateOfRow * (gridSystem / elementForEachRow)),
                    offsetMedium = "medium-offset-"+ (stateOfRow * (gridSystem / elementForEachRow)),
                    offsetLarge = "large-offset-"+ (stateOfRow * (gridSystem / elementForEachRow));
                var offset = offsetSmall + " " + offsetMedium + " " + offsetLarge;
                body[body.length - 1].innerHTML += '<div class="cell medium-2 large-2 small-2 ' + offset + '"></div>';
            }
        }

        sorting(classe);

        var j = 0;
        var k = 1;
        for (let i = 0; i < classe.length; i++) {
            if (j === elementForEachRow || j === 0) {
                j = 0;
                createWrapper();
            }
            if (k === classe[i].posizione) {
                createRow("normal");
            } else {
                var difference = classe[i].posizione - k;
                console.log("Difference is: " + difference);
                createRow(difference);
                k = k+difference;
            }
            k++;
            j++;
        }

        selector = document.querySelectorAll('.grid-x div');

        document.addEventListener('crea', sortStamp);
        var event = new Event('crea');
        document.dispatchEvent(event);
    };

    function offsetAdd(index) {
        selector[index].classList.remove('cell', 'medium-2', 'large-2', 'small-2');
    };

    /**
     * @param {Array|Object} object 
     */
    function sorting(object) {
        object.sort(function (a, b) {
            return parseInt(a.posizione) - parseInt(b.posizione);
        });
        return object;
    };

    /**
     * Get data from json
     */
    fetch(rqt)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            for (var i = 0; i < data.class.persona.length; i++) {
                classe.push(data.class.persona[i]);
            }
            //Create custom event for stamp and sorting the array
            document.addEventListener('sorting', creaTavoli);
            var event = new Event('sorting');
            document.dispatchEvent(event);
        });

    /**
     * Stamp classe array 
     */
    function sortStamp() {
        /**
         * Stamp array with 2 cicle 
         * j for index of classe
         * i for posizioni of classe
         */

        for (var j = 0; j < classe.length; j++) {
            posto(j);
        }

        /*
        let app = 0;
        for (var y = 0; y < classe.length; y++) {
            for (var i = 0; i <= selector.length - 1; i++) {
                if (selector[i].innerHTML == "") {
                    offsetAdd(i);
                    app++;
                } else if(classe[y].posizione) {
                    offSetRemove(app);
                    app = 0;
                }
            }
        };
        */

        function offSetRemove(index) {
            selector[index].classList.add('medium-offset-' + index, 'large-offset-' + index, 'small-offset-' + index);
        };

        /**
         * indexOfTables of tables
         * indexOfPerson of person
         * @param {Number} indexOfTables 
         * @param {Number} indexOfPerson 
         */
        function posto(indexOfTables) {
            selector[indexOfTables].innerHTML = "Nome: " + classe[indexOfTables].nome + "<br> Età: " + classe[indexOfTables].eta;
        };
    }
});
