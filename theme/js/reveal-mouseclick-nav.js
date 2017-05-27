(function(){
    Reveal.addEventListener('mousedown', handleClick, false);
    Reveal.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);

    function handleClick(e) {
        switch (e.button) {
            case 0:
                Reveal.next();
                e.preventDefault();
                break;
            case 1:
                Reveal.toggleOverview();
                e.preventDefault();
                break;
            case 2:
                Reveal.prev();
                e.preventDefault();
                break;
        }
    }
})();