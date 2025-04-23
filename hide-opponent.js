/**
 * Toggles the provided `element`'s CSS visibility property to `hidden`.
 * @param {HTMLElement} element Element to toggle
 * @returns {void}
 */
const toggleElement = (element) => {
    if (element) element.style.visibility = 'hidden';
};

/**
 * Creates a MutationObserver with the provided `elementToObserve` and creates and hides each provided `selectorsToHide`.
 * @param {HTMLDivElement} elementToObserve Element to attatch MutationObserver to
 * @param {string[]} selectorsToHide element selectors to hide
 * @returns {void}
 */
const createObserver = (elementToObserve, selectorsToHide) => {
    const observer = new MutationObserver(() => {
        selectorsToHide.forEach((selector) => {
            document
                .querySelectorAll(selector)
                .forEach((el) => toggleElement(el));
        });
    });
    observer.observe(elementToObserve, { childList: true });
};

/**
 * Recursively validates a `selector`'s existence in the ODM before passing it to provided `callback`. If `selector` is invalid, reattempts 10 times with .5 second intervals.
 * @param {string} selector Element selector to validate
 * @param {(element: Element) => void} callback Function to call upon successful validation
 * @param {number} attempts Number of current recursive attempts
 * @returns {void | null}
 */
const validateElement = (selector, callback, attempts = 1) => {
    if (attempts > 10) return null;

    const element = document.querySelector(selector);

    if (element) {
        callback(element);
    } else {
        setTimeout(() => validateElement(selector, callback, attempts + 1), 50);
    }
};

browser.runtime.onMessage.addListener(async () => {
    const { userPreferences } =
        await browser.storage.local.get('userPreferences');
    if (!userPreferences.enable) return;
    toggleElement(document.querySelector('div.user-tagline-component'));
    toggleElement(document.querySelector('div.player-avatar-component > img'));
    document
        .querySelectorAll('div.game-start-message-component')
        .forEach((el) => {
            toggleElement(el);
        });

    if (userPreferences.postgame_rating)
        validateElement('div.player-tagline', (element) => {
            const elementsToHide = ['div.player-game-over-component'];
            createObserver(element, elementsToHide);
        });

    if (
        userPreferences.postgame_chat_gameover ||
        userPreferences.postgame_chat_vote
    )
        validateElement('div.chat-room-chat', (element) => {
            const elementsToHide = [
                userPreferences.postgame_chat_gameover &&
                    'div.game-over-message-component',
                userPreferences.postgame_chat_vote &&
                    'div.game-rate-sport-message-component',
            ].filter(Boolean);

            createObserver(element, elementsToHide);
        });
});
