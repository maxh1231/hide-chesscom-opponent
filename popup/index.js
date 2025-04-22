document.addEventListener('DOMContentLoaded', async () => {
    const { userPreferences } =
        await browser.storage.local.get('userPreferences');
    console.log(userPreferences);

    const icon = document.getElementById('power');

    icon.setAttribute(
        'src',
        userPreferences.enable
            ? '../assets/power-off.png'
            : '../assets/power-on.png'
    );

    icon.addEventListener('click', () => {
        let newPrefs = {
            enable: false,
            postgame_rating: false,
            postgame_chat_gameover: false,
            postgame_chat_vote: false,
        };
        browser.storage.local.set(newPrefs);

        icon.setAttribute('src', '../assets/power-on.png');
    });
});
