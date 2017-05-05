!function ($) {
    /**
     * Construct the components.
     */
    new Clouds($);
    new Sun($);

    $.addEventListener('ready', function () {
        new WhitePane($);
    });

    /**
     * White pane ensures the white pane in some slides transitions properly.
     *
     * @constructor
     */
    function WhitePane($) {
        const transitionsRequiringWhitePane = ['fade', 'zoom']; // Not: 'none', 'slide', 'convex', 'concave'

        // TODO: Inject white pane when required.
        let whitePane = document.getElementById('white-pane');

        if (transitionsRequiringWhitePane.indexOf($.getConfig().transition) === -1) {
            // Only these transition schemes require a white-pane. Ignore this
            // component in all other cases
            if (whitePane) whitePane.style.display = 'none';

            return;
        }

        if (!whitePane) {
            console.error('No white-pane detected. Skipping');

            return;
        }

        let displayWhitePane = whitePane.style.display !== 'none';

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

    /**
     * Handles clouds triggering.
     *
     * @constructor
     */
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

    /**
     * Handles sun triggering.
     *
     * @constructor
     */
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
