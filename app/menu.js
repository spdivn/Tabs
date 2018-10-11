'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var buttonMenu = document.querySelector('#menuVertical');
    // var menuList = document.querySelector('.menu__list');
    var menuBox = document.querySelector('#menu');
    var checkClick = 1;
    buttonMenu.addEventListener('click', function (event) {
        event.preventDefault();
        if (checkClick === 1) {
            menuBox.classList.remove('isNotActive');
            menuBox.classList.add('isActive');
            checkClick++;
        } else {
            menuBox.classList.add('isNotActive');
            setTimeout(() => {
                menuBox.classList.remove('isActive');
                menuBox.classList.remove('isNotActive');
                checkClick = 1;
            }, 500);
        }
    });
});