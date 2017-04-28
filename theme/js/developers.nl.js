!function ($) {
    /**
     * Construct the components.
     */
    new WhitePane($);
    new Clouds($);
    new Sun($);

    /**
     * White pane ensures the white pane in some slides transitions properly.
     *
     * @constructor
     */
    function WhitePane() {
        let displayWhitePane = document.getElementById('white-pane').style.display !== 'none';
        let whitePane = document.getElementById('white-pane');

        if (!whitePane) {
            console.error('No white-pane detected. Skipping');

            return;
        }

        $.addEventListener('slidechanged', onSlideChanged);
        $.addEventListener('transitionend', onSlideTransitionEnd);

        function hasWhitePane(slide) {
            try {
                return slide.firstElementChild.tagName.toUpperCase() === 'HEADER';
            } catch (e) {
                return false;
            }
        }

        function onSlideChanged(event) {
            if (displayWhitePane) {
                // If user moves through slides faster than intended, ensure white
                // pane is displayed.
                whitePane.style.display = '';
            }

            displayWhitePane = hasWhitePane(event.currentSlide);

            if (!displayWhitePane) {
                // Not displayed: remove the white pane to let reveal handle the
                // transition.
                whitePane.style.display = 'none';
            }
        }

        function onSlideTransitionEnd() {
            if (displayWhitePane) {
                // Transition done and the white pane should be displayed: show it.
                // This is done after transition to ensure fluid transitions.
                whitePane.style.display = '';
            }
        }
    }

    function Clouds($)
    {
        let clouds = document.getElementById('clouds');

        if (!clouds) {
            console.error('No clouds detected. Skipping');

            return;
        }

        $.addEventListener('slidechanged', onSlideChanged);

        function onSlideChanged(event) {
            if (hasClouds(event.currentSlide)) {
                clouds.classList.remove('hidden');
            } else {
                clouds.classList.add('hidden');
            }
        }

        function hasClouds(slide) {
            try {
                return slide && slide.classList.contains('with-clouds');
            } catch (e) {
                return false;
            }
        }
    }

    function Sun($)
    {
        $.addEventListener('slidechanged', onSlideChanged);

        function onSlideChanged(event) {
            if (isFirstSlide(event.currentSlide)) {
                event.srcElement.classList.add('large-sun');
            } else {
                event.srcElement.classList.remove('large-sun');
            }
        }

        function isFirstSlide(slide) {
            try {
                return slide && slide.classList.contains('first-slide');
            } catch (e) {
                return false;
            }
        }
    }
}(Reveal);
