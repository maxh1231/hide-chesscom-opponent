const checkAllBtn = document.getElementById('check-all');
const radioBtns = document.getElementsByTagName('input');
let count = 1;

console.log(radioBtns)

checkAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkAllBtn.textContent == 'Check All') checkButtons(radioBtns, true)
    else if (checkAllBtn.textContent == 'Uncheck All') checkButtons(radioBtns, false)
})

const checkButtons = (btnsToCheck, check) => {
    for (let btn of btnsToCheck) {
        btn.checked = check
    }
    if (check) checkAllBtn.textContent = 'Uncheck All'
    else if (!check) checkAllBtn.textContent = 'Check All'
}