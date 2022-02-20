(function() {
    'use strict';

    function handlerForSubmitSearch(_event) {
        // _event.preventDefault(); // for debug
        const elements = Array.from(this.querySelectorAll('input[name="q"]'));
        elements.forEach(e => e.value = `site:${location.hostname} ${e.value}`);
    }

    function initialize() {
        const targets = Array.from(document.querySelectorAll('.widget_search form'));
        targets.forEach(x => x.addEventListener('submit', handlerForSubmitSearch));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
