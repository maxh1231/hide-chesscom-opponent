const form = document.getElementById('settings-form')

const checkAllBtn = document.getElementById('check-all');
const checkboxBtns = document.getElementsByTagName('input');

const usernameBtn = document.getElementById('username');
const usernamePostGameBtn = document.getElementById('username-postgame')

const ratingBtn = document.getElementById('rating');
const ratingPostGameBtn = document.getElementById('rating-postgame');

// Check / Uncheck checkboxes and change button text
const checkAllButtons = (btnsToCheck, doCheck) => {
    for (let btn of btnsToCheck) {
        btn.checked = doCheck;
    }
    toggleIndentSetting(usernamePostGameBtn)
    toggleIndentSetting(ratingPostGameBtn);
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

const toggleIndentSetting = (indentBtn) => {
    indentBtn.disabled = !indentBtn.parentElement.parentElement.previousElementSibling.firstElementChild.checked;
    indentBtn.parentElement.previousElementSibling.style.opacity = indentBtn.disabled ? '.7' : '1';

    if (indentBtn.disabled) indentBtn.checked = false;
}

ratingBtn.addEventListener('click', () => {
    toggleIndentSetting(ratingPostGameBtn);
})

usernameBtn.addEventListener('click', () => {
    toggleIndentSetting(usernamePostGameBtn)
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let data = new FormData(form);
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
})


// dev convenience, should pull storage.local and persist settings
document.addEventListener('DOMContentLoaded', async () => {

    try {
        const { userPreferences } = await browser.storage.local.get('userPreferences');

        for (const [key, value] of Object.entries(userPreferences)) {
            checkboxBtns[`${key}`].checked = value;

            if (key.includes('postgame')) toggleIndentSetting(checkboxBtns[`${key}`]);
        }
    } catch {
        console.error('User Preferences not found.')
    }
})

