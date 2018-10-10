/**
 * When document is ready and loaded start tasks
 */
$(document).ready(event => {
    //VARIABLES
    const $buttonLoader = $('#Loader'),
        $html = $('html'),
        $tabsList = $('.tabs__list'),
        $buttonModal = $('#Modal'),
        $modal = $('.modal'),
        $buttonCloseModal = $('.modal__close'),
        $buttonAccept = $('.modal__button'),
        $modalBox = $('.modal__box'),
        $accordion = $('.accordion');

    /**
     * Tabs
     */
    //Add click listener to whole link list
    $tabsList.on('click', '.tabs__item a', function (event) {
        event.preventDefault();
        //Get clicked tab list item
        let $tabsItem = $(this).parent();

        //Get corresponding panel's ID via hash
        let $targetId = $(this).attr('href');

        //Get correct panel by ID
        let $targetPanel = $($targetId);

        //setLoaderct tabs menu item
        let $allTabsItems = $('.tabs__item');
        $allTabsItems.removeClass("is-active")

        //Add class to item panel 
        $tabsItem.addClass('is-active');

        //setLoaderct panel menu item
        let $allTabsPanel = $('.tabs__panel');
        $allTabsPanel.removeClass('is-active');

        //Add class to target panel 
        $targetPanel.addClass('is-active');
    });

    /**
     * Accordion
     */
    $accordion.on('click', '.accordion__header a, .accordion__header a *', function (event) {
        event.preventDefault();

        //Variables
        let $loopingElement = $(this);
        let $targhetHeader = $loopingElement.parent();
        let $targetPanel = $targhetHeader.next();

        //Containers
        $targetPanel.toggleClass('is-active');

        $targhetHeader.toggleClass('is-active');
    });

    /**
     * Loader
     */

    $buttonLoader.on('click', setLoader);

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

     //Init clicks event
    $buttonCloseModal.on('click', closeModal);
    $buttonAccept.on('click', closeModal);
    $buttonModal.on('click', openModal);
    $modal.on('click', closeModal);

    //Open modal
    function openModal() {
        $modalBox.removeClass('is-removed');
        setLoader();
        $modal.addClass('is-active');
    }

    //Close modal
    function closeModal() {
        $modalBox.addClass('is-removed');
        setTimeout(() => {
            $modalBox.removeClass('is-removed');
            $modal.removeClass('is-active');
            removeLoader();
        }, 400);
    }

    /**
     * Keydown Escape on html
     */
    $(document).on('keydown', event => {
        if (event.key === "Escape") {
            closeModal();
            removeLoader();
        }
    });

    /**
     * Restore click for modal box and add click for modal background
     */
    $modal.find('.modal__box').on('click', event => {
        event.stopPropagation();
    });
});
