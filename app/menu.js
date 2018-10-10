'use strict';

document.addEventListener('DOMContentLoaded',function(){
    var buttonMenu = document.querySelector('#menuVertical');
    var menuList = document.querySelector('.menu__list');
    var menuBox = document.querySelector('#menu');
    buttonMenu.addEventListener('click',function(event){
        event.preventDefault();
        menuList.classList.toggle('hidden');
        menuBox.classList.toggle('isActive');
    });
});