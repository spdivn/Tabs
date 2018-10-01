console.log('test');

//Get <ul> with list of tab links
const tabsList = document.querySelector('.tabs__list');

//Add click listener to whole link list
tabsList.addEventListener('click', event => {
    //Event delegation
    if (event.target.matches('.tabs__item a')) {
        event.preventDefault();

        //Get clicked tab list item
        const tabsItem = event.target.parentNode;

        //Get corresponding panel's ID via hash
        const targetId = event.target.hash.slice(1);

        //Get correct panel by ID
        const targetPanel = document.getElementById(targetId);

        console.log(targetPanel);

        //Activate correct tabs menu item
        const allTabsItems = document.querySelectorAll('.tabs__item');
        allTabsItems.forEach(item => {
            item.classList.remove('is-active');
        });

        //Add class to item panel 
        tabsItem.classList.add('is-active');

        //Activate correct panel menu item
        const allTabsPanel = document.querySelectorAll('.tabs__panel');
        allTabsPanel.forEach(item => {
            item.classList.remove('is-active');
        });

        //Add class to target panel 
        targetPanel.classList.add('is-active');
    }
});

/**
 * Accordion
 */

const accordion = document.querySelector('.accordion');
accordion.addEventListener('click', event => {
    if (event.target.matches('.accordion__header a, .accordion__header a *')) {
        event.preventDefault();

        let loopingElement = event.target;

        while (loopingElement.tagName.toLowerCase() != 'a') {
            const nextParent = event.target.parentNode;
            loopingElement = loopingElement.parentNode;
        }

        const targhetHeader = loopingElement.parentNode;

        const targetPanel = targhetHeader.nextElementSibling;

        //Contenitori

        // const allPanels = document.querySelectorAll('.accordion__panel.is-active');

        // allPanels.forEach(panels => {
        //     panels.classList.remove('is-active');
        // });

        targetPanel.classList.toggle('is-active');
        // targetPanel.classList.add('is-active');

        //Headers = titoli dei contenitori

        // const allHeaders = document.querySelectorAll('.accordion__header');

        // allHeaders.forEach(header => {
        //     header.classList.remove('is-active');
        // });

        targhetHeader.classList.toggle('is-active');
        // targhetHeader.classList.add('is-active');
    }
});

const button = document.querySelector('button');

button.addEventListener('click', activateLoader);

function activateLoader() {
    document.querySelector('html').classList.add('prevent-scroll');
    document.querySelector('html').classList.add('is-loading');
}
activateLoader();

function disableScroll() {
    document.querySelector('html').classList.remove('prevent-scroll');
    document.querySelector('html').classList.remove('is-loading');
}

setTimeout(() => {
    disableScroll();
}, 2000);


const modal = document.querySelector('.modal');

//Open modal
function openModal() {
    const modalBox = document.querySelector('.modal__box');
    modalBox.classList.remove('is-removed');
    activateLoader();
    modal.classList.add('is-active');
}

//Close modal
function closeModal() {
    const modalBox = document.querySelector('.modal__box');
    modalBox.classList.add('is-removed');
    setTimeout(() => {
        modalBox.classList.remove('is-removed');
        modal.classList.remove('is-active');
        disableScroll();
    },400);
}

document.addEventListener('keydown',event =>{
    if(event.key==="Escape"){
        closeModal();
        disableScroll();
    }
});

modal.addEventListener('click',closeModal);
modal.querySelector('.modal__box').addEventListener('click',event =>{
    event.stopPropagation();
});





//How NOT do it :

/*
const tabsItems = document.querySelectorAll('.tabs__item a');

tabsItems.forEach(el => {
    el.addEventListener('click', event => {
        event.preventDefault();
        console.log('Click', event.target);
    })
})

*/