const checkboxBtns = document.getElementsByTagName('input');

/**
 * Enables or disables `checkbox` based on `activate`. Buttons that are disabled are also unchecked.
 * @param {HTMLInputElement} checkbox to enable or disable. unchecked if `activate = false`.
 * @param {boolean} activate
 */
const toggleCheckbox = (checkbox, activate) => {
    if (activate) {
        checkbox.disabled = false;
        checkbox.nextElementSibling.classList.remove('disabled');
    } else if (!activate) {
        checkbox.disabled = true;
        checkbox.checked = false;
        checkbox.nextElementSibling.classList.add('disabled');
    }
};

/**
 * Adds `click` listener to extension enable/disable toggler to disable/enable & uncheck child checkboxes. If `popupForm` is provided, the listener also calls `savePreferences`.
 * @param {HTMLFormElement} popupForm used to determine if settings should be saved on each event.
 */
const addEnableListener = (popupForm = false) => {
    document.getElementById('enable').addEventListener('click', (e) => {
        Array.from(checkboxBtns)
            .slice(1)
            .forEach((btn) => toggleCheckbox(btn, e.target.checked));

        if (popupForm) savePreferences(popupForm);
    });
};

/**
 * Obtains user preferences from provided `form` and saves to `storage.local`.
 * @param {HTMLFormElement} form settings to save.
 */
const savePreferences = async (form) => {
    let data = new FormData(form);
    await browser.storage.local.clear();
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
};

document.addEventListener('DOMContentLoaded', async () => {
    const { userPreferences } =
        await browser.storage.local.get('userPreferences');

    for (const [key, value] of Object.entries(userPreferences)) {
        if (!userPreferences.enable && key != 'enable')
            toggleCheckbox(checkboxBtns[key], false);

        checkboxBtns[key].checked = value;
    }

    // Options Page: onSubmit listener
    try {
        const form = document.getElementById('options-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            savePreferences(form);
        });
        addEnableListener();
    } catch (err) {
        if ((!err) instanceof TypeError) console.err(err);
    }

    // Browser Action: Rating, Game Over, & User Voting onChange listeners
    try {
        const form = document.getElementById('popup-form');
        Array.from(form.elements)
            .slice(1)
            .map((el) =>
                el.addEventListener('change', () => {
                    savePreferences(form);
                })
            );
        addEnableListener(form);
    } catch (err) {
        if ((!err) instanceof TypeError) console.err(err);
    }
});
