document.addEventListener("DOMContentLoaded", element => {
    //VARIABLES
    const productSize = document.querySelector('.product-size'),
        productColor = document.querySelector('.product-color'),
        productPrice = document.querySelector('.product-price'),
        productName = document.querySelector('.product-name h1');

    let currency,
        listOfProduct = [],
        listCustom = [];

    var productAvaible = [];


    /**
    * Get data from json
    */
    fetch('json/shopper.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
            for (var i = 0; i < data.productList.length; i++) {
                if (data.productList[i].type == "customizable") {
                    listCustom.push(data.productList[i]);
                } else {
                    listOfProduct.push(data.productList[i]);
                }
            }
            currency = data.currency;

            //Create custom event for stamp and sorting the array
            document.addEventListener('getData', getDataFromRelation(listCustom));
            var event = new Event('getData');
            document.dispatchEvent(event);
        });

    /**
     * Get list of customizable item and push() the avaible product 
     * @param {Array|Object} object 
     */
    function getDataFromRelation(object) {
        for (let objInd = 0; objInd < object.length; objInd++) {
            for (let ind = 0; ind < object[objInd].relations.length; ind++) {
                for (let index = 0; index < listOfProduct.length; index++) {
                    if (object[objInd].relations[ind] == listOfProduct[index].id && listOfProduct[index].active) {
                        productAvaible.push(listOfProduct[index]);
                    }
                }
            }
        }

        document.addEventListener('writeData', stampAll(0));
        var event = new Event('writeData');
        document.dispatchEvent(event);
    }

    /**
     * 
     * @param {Number} indexOfFirst 
     */
    function stampAll(indexOfFirst) {
        let index = 0;

        //Init of price and name
        productPrice.innerHTML = productAvaible[Number(indexOfFirst)].price + currency;
        productName.innerHTML = productAvaible[Number(indexOfFirst)].name;

        //Init of all sizes
        productSize.innerHTML = '<a href="#" class="sizes" alt="">' + productAvaible[index].size + '</a>';
        for (let col = index + 1; col < productAvaible.length; col++) {
            if (productAvaible[index].size != productAvaible[col].size && productAvaible[index].size != productAvaible[col].size) {
                productSize.innerHTML += '<a href="#" class="sizes" alt="">' + productAvaible[col].size + '</a>';
                index++;
            }
        }
        index = 0;

        //Init of all colors
        productColor.innerHTML = '<a href="#" class="colors" alt="">' + productAvaible[index].color + '</a>';
        for (let col = index + 1; col < productAvaible.length; col++) {
            if (productAvaible[index].color != productAvaible[col].color && productAvaible[index].color != productAvaible[col].color) {
                productColor.innerHTML += '<a href="#" class="colors" alt="">' + productAvaible[col].color + '</a>';
                index++;
            }
        }
        index = 0;


        //Get all a link for colors/sizes/generic
        var aLinkProd = document.querySelectorAll('a'),
            aLinkColor = document.querySelectorAll('a.colors'),
            aLinkSizes = document.querySelectorAll('a.sizes');

        //Set the active link for colors
        for (let col = 0; col < aLinkColor.length; col++) {
            if (aLinkColor[col].firstChild.data == productAvaible[indexOfFirst].color) {
                aLinkColor[col].classList.add('is--active');
            } else {
                aLinkColor[col].classList.remove('is--active');
            }
        }

        //Set the active link for sizes
        for (let col = 0; col < aLinkSizes.length; col++) {
            if (aLinkSizes[col].firstChild.data == productAvaible[indexOfFirst].size) {
                aLinkSizes[col].classList.add('is--active');
            } else {
                aLinkSizes[col].classList.remove('is--active');
            }
        }

        //Event listener for all a links and refresh the ui
        aLinkProd.forEach(el => {
            el.addEventListener('click', event => {
                event.preventDefault();
                if (event.target.classList[1] != 'is--active') {
                    for (let index = 0; index < productAvaible.length; index++) {
                        if (event.target.firstChild.data == productAvaible[index].color) {
                            stampAll(index);
                            break;
                        } else if (event.target.firstChild.data == productAvaible[index].size) {
                            stampAll(index);
                            break;
                        }
                    }
                }
                event.stopPropagation();
            })
        })
    }

});