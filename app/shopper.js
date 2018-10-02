document.addEventListener("DOMContentLoaded", element => {
    //VARIABLES

});
var rqt = new Request('json/shopper.json');
let listOfProduct = [];
/**
* Get data from json
*/
fetch(rqt)
    .then(function (response) { return response.json(); })
    .then(function (data) {
        for (var i = 0; i < data.productList.length; i++) {
            listOfProduct.push(data.productList[i]);
        }
        //Create custom event for stamp and sorting the array
        document.addEventListener('getData', getDataFromRelation);
        var event = new Event('getData');
        document.dispatchEvent(event);
    });

const price = document.getElementsByClassName('prezzo');
const name = document.getElementsByClassName('prodotto');
const size = document.getElementsByClassName('taglia');
const color_s = document.getElementsByClassName('colori');

var sizes = [];
var colors = [];
var price = [];

// price.innerHtml = listOfProduct[0].price;

function getDataFromRelation() {
    for (let ind = 0; ind < listOfProduct[0].relations.length; ind++) {
        for (let index = 0; index < listOfProduct.length; index++) {
            if (listOfProduct[0].relations[ind] == listOfProduct[index].id) {
                sizes.push(listOfProduct[index].size);
                colors.push(listOfProduct[index].color);
                price.push(listOfProduct[index].price);
            }
        }
    }
}

function stampSize() {
    for(let index=0; index < listOfProduct[0].relations.length;index++){
        size.innerHTML += sizes[index];
    }
}
