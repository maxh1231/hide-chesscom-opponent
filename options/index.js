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
    toggleIndentButton(usernamePostGameBtn, usernameBtn)
    toggleIndentButton(ratingPostGameBtn, ratingBtn);
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

const toggleIndentButton = (indentBtn, parentBtn) => {
    console.log(indentBtn.parentElement)
    indentBtn.disabled = !parentBtn.checked;
    indentBtn.parentElement.previousElementSibling.style.opacity = indentBtn.disabled ? '.7' : '1';

    if (indentBtn.disabled) indentBtn.checked = false;
}

ratingBtn.addEventListener('click', () => {
    toggleIndentButton(ratingPostGameBtn, ratingBtn);
})

usernameBtn.addEventListener('click', () => {
    toggleIndentButton(usernamePostGameBtn, usernameBtn)
})







// dev convenience, should pull storage.local and persist settings
document.addEventListener('DOMContentLoaded', () => {
    toggleIndentButton(usernamePostGameBtn, usernamePostGameLbl, usernameBtn)
    toggleIndentButton(ratingPostGameBtn, ratingPostGameLbl, ratingBtn)
})

