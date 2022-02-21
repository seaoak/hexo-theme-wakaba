(function() {
    'use strict';

    function handlerForSubmitSearch(_event) {
        // _event.preventDefault(); // for debug
        const elements = Array.from(this.querySelectorAll('input[name="q"]'));
        elements.forEach(e => e.value = `site:${location.hostname} ${e.value}`);
    }

    function makeHandlerForScroll() {
        const target = Array.from(document.querySelectorAll('.global_nav_title'))[0];
        if (!target) return () => {}; // NOP
        const aim = document.querySelectorAll('#container > header h1')[0];
        if (!aim) return () => {}; // NOP
        const threshold = aim.offsetTop + aim.offsetHeight * 0.3;

        let previous = undefined;
        let timeoutId = null;
        return (_event) => {
            const isVisible = window.scrollY > threshold;
            if (isVisible === previous) return;
            previous = isVisible;
            if (isVisible) target.style.visibility = 'visible';
            target.style.opacity = isVisible ? 1.0 : 0.0; // start animation
            if (timeoutId) clearTimeout(timeoutId);
            if (isVisible) return;
            timeoutId = setTimeout(() => {
                timeoutId = null;
                target.style.visibility = 'hidden';
            }, 500);
        };
    }

    // avoid too frequently call
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
    function toDeferredHandler(handler, delay_ms) {
        let isScheduled = false;
        let discardedLastEvent = null;

        // use "function" statement to keep "this" value
        function callbackForEvent(event) {
            if (isScheduled) {
                discardedLastEvent = [this, [event]];
                return;
            }
            const that = this;
            isScheduled = true;
            discardedLastEvent = null;
            setTimeout(() => handler.apply(that, [event]), 0);
            setTimeout(() => {
                isScheduled = false;
                if (discardedLastEvent) {
                    // call handler immediately
                    callbackForEvent.apply(... discardedLastEvent);
                }
            }, delay_ms);
        }

        return callbackForEvent;
    }

    function initialize() {
        const targets = Array.from(document.querySelectorAll('.search_form'));
        targets.forEach(x => x.addEventListener('submit', handlerForSubmitSearch));

        window.addEventListener('scroll', makeHandlerForScroll());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();