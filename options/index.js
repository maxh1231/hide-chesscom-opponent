const checkAllBtn = document.getElementById('check-all');
const checkboxBtns = document.getElementsByTagName('input');

/**
 * Checks or unchecks all `btnsToCheck`.
 * @param {HTMLCollectionOf<HTMLInputElement>} btnsToCheck 
 * @param {boolean} doCheck 
 */
const checkAllButtons = (btnsToCheck, doCheck) => {
    for (let btn of btnsToCheck) {
        btn.checked = doCheck;
        if (btn.name.includes('postgame')) toggleIndentSetting(btn);
    }
}

/**
 * Disables and unchecks input if parent input is unchecked.
 * Enables input if parent input is checked.
 * @param {HTMLInputElement} indentBtn 
 */
const toggleIndentSetting = (indentBtn) => {
    indentBtn.disabled = !indentBtn.parentElement.parentElement.previousElementSibling.firstElementChild.checked;
    indentBtn.parentElement.previousElementSibling.style.opacity = indentBtn.disabled ? '.7' : '1';

    if (indentBtn.disabled) indentBtn.checked = false;
}

// Refactor better way to handle conditional button switch
checkAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkAllBtn.textContent == 'Check All') {
        checkAllButtons(checkboxBtns, true);
        checkAllBtn.textContent = 'Uncheck All';
    }
    else if (checkAllBtn.textContent == 'Uncheck All') {
        checkAllButtons(checkboxBtns, false);
        checkAllBtn.textContent = 'Check All';
    }
})

document.getElementById('username').addEventListener('click', (e) => toggleIndentSetting(e.target.parentElement.nextElementSibling.lastElementChild.firstElementChild));
document.getElementById('rating').addEventListener('click', (e) => toggleIndentSetting(e.target.parentElement.nextElementSibling.lastElementChild.firstElementChild));

document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    let userPreferences = {
        avatar: false,
        badge: false,
        flag: false,
        flair: false,
        rating: false,
        rating_postgame: false,
        username: false,
        username_postgame: false
    };
    for (const key of data.keys()) {
        userPreferences[`${key}`] = true;
    }
    await browser.storage.local.set({ userPreferences });
});

/**
 * Retrieves user preferences and applies them
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { userPreferences } = await browser.storage.local.get('userPreferences');

        for (const [key, value] of Object.entries(userPreferences)) {
            checkboxBtns[`${key}`].checked = value;

            if (key.includes('postgame')) toggleIndentSetting(checkboxBtns[`${key}`]);
        }
    } catch {
        console.error('User Preferences not found.');
    }
});