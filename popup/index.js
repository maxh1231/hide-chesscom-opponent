document.addEventListener('DOMContentLoaded', async () => {
    let { userPreferences } =
        await browser.storage.local.get('userPreferences');
    let currState = userPreferences.enable;

    const icon = document.getElementById('power');

    icon.setAttribute(
        'src',
        currState ? '../assets/power-off.png' : '../assets/power-on.png'
    );

    icon.addEventListener('click', async () => {
        currState = userPreferences.enable;
        icon.setAttribute(
            'src',
            currState ? '../assets/power-on.png' : '../assets/power-off.png'
        );
        for (const [key] of Object.entries(userPreferences)) {
            userPreferences[key] = !currState;
        }
        await browser.storage.local.set({ userPreferences });
    });
});
