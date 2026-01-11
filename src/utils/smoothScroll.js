/**
 * @file smoothScroll.js
 * @brief Physics-based scroll animation for a native app feel.
 */
export function smoothScroll(element, target, duration) {
    if (!element) return;
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // EaseOutQuart: Starts fast, slows down gently (Native feel)
        const ease = 1 - Math.pow(1 - progress, 4);
        
        element.scrollLeft = start + (change * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}