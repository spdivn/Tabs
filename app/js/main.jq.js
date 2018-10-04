/**
 * Tabs
 */

//Get <ul> with list of tab links
$(document).ready(event => {
    const $tabsList = $('.tabs__list');
    //Add click listener to whole link list
    $tabsList.on('click', '.tabs__item a', event => {
        event.preventDefault();
        //Get clicked tab list item
        const tabsItem = event.target.parentNode;

        //Get corresponding panel's ID via hash
        const targetId = event.target.hash;

        //Get correct panel by ID
        const targetPanel = $(targetId);

        //setLoaderct tabs menu item
        const $allTabsItems = $('.tabs__item');
        $allTabsItems.removeClass("is-active")

        //Add class to item panel 
        tabsItem.classList.add('is-active');

        //setLoaderct panel menu item
        const $allTabsPanel = $('.tabs__panel');
        $allTabsPanel.removeClass('is-active');

        //Add class to target panel 

        targetPanel.addClass('is-active');
    });

    /**
     * Accordion
     */

    const $accordion = $('.accordion');
    $accordion.on('click', '.accordion__header a, .accordion__header a *', event => {
        event.preventDefault();

        let loopingElement = event.target;

        while (loopingElement.tagName.toLowerCase() != 'a') {
            const nextParent = event.target.parentNode;
            loopingElement = loopingElement.parentNode;
        }

        const targhetHeader = loopingElement.parentNode;

        const targetPanel = targhetHeader.nextElementSibling;

        //Contenitori

        targetPanel.classList.toggle('is-active');

        targhetHeader.classList.toggle('is-active');
    });

    /**
     * Loader
     */

    const $buttonLoader = $('#Loader');

    $buttonLoader.on('click', setLoader);
    const $html = $('html');

    function setLoader() {
        $html.addClass('prevent-scroll');
        $html.addClass('is-loading');
    }

    function removeLoader() {
        $html.removeClass('prevent-scroll');
        $html.removeClass('is-loading');
    }   

    /**
     * Modal
     */

    const $buttonModal = $('#Modal');
    const $modal = $('.modal');
    let $buttonCloseModal = $('.modal__close');
    let $buttonAccept = $('.modal__button');

    
    $buttonCloseModal.on('click',closeModal);
    $buttonAccept.on('click',closeModal);

    $buttonModal.on('click',openModal);

    //Open modal
    function openModal() {
        const $modalBox = $('.modal__box'); 
        $modalBox.removeClass('is-removed');
        setLoader();
        $modal.addClass('is-active');
    }

    //Close modal
    function closeModal() {
        const $modalBox = $('.modal__box');
        $modalBox.addClass('is-removed');
        setTimeout(() => {
            $modalBox.removeClass('is-removed');
            $modal.removeClass('is-active');
            removeLoader();
        }, 400);
    }

    /**
     * Keydown press on html
     */
    document.addEventListener('keydown', event => {
        if (event.key === "Escape") {
            closeModal();
            removeLoader();
        }
    });

    /**
     * restore click for modal box and add click for modal background
     */

    $modal.on('click', closeModal);
    $('.modal__box').on('click', event => {
        event.stopPropagation();
    });
});
