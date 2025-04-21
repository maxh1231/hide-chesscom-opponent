const checkboxBtns = document.getElementsByTagName('input');

/**
 * Enables or disables `btn` based on `activate`. Buttons that are disabled are also unchecked.
 * @param {HTMLInputElement[]} btn
 * @param {boolean} activate
 */
const toggleBtn = (btn, activate) => {
    if (activate) {
        btn.disabled = false;
        btn.parentElement.previousElementSibling.style.opacity = 1;
    } else if (!activate) {
        btn.disabled = true;
        btn.checked = false;
        btn.parentElement.previousElementSibling.style.opacity = 0.7;
    }
};

/**
 * Extension enable/disable event listener. Converts NodeList<HTMLInputElement> to HTMLInputElement[] and passes each button to `toggleBtn`.
 */
document.getElementById('enable').addEventListener('click', (e) =>
    Array.from(checkboxBtns)
        .slice(1)
        .forEach((btn) => toggleBtn(btn, e.target.checked))
);

/**
 * Form submission event listener. Updates storage object with new values.
 */
document
    .getElementById('settings-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        let data = new FormData(e.target);

        let userPreferences = {
            enable: false,
            postgame_rating: false,
            postgame_chat_gameover: false,
            postgame_chat_vote: false,
        };

        for (const key of data.keys()) {
            userPreferences[`${key}`] = true;
        }
        await browser.storage.local.set({ userPreferences });
    });

/**
 * Retrieves user preferences and applies them
 * Is eventListener necessary?
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { userPreferences } =
            await browser.storage.local.get('userPreferences');

        for (const [key, value] of Object.entries(userPreferences)) {
            if (!userPreferences.enable && key != 'enable')
                toggleBtn(checkboxBtns[key], false);
            checkboxBtns[key].checked = value;
        }
    } catch {
        console.error('User Preferences not found');
    }
});
