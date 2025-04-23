let userPreferences;
document.addEventListener('DOMContentLoaded', async () => {
    let storageData = await browser.storage.local.get('userPreferences');
    userPreferences = storageData.userPreferences;

    updateIcon(userPreferences.enable);
});

const icon = document.getElementById('power');

/**
 * Changes on/off icon depending on if extension is enabled/disabled.
 * @param {boolean} isEnabled
 */
const updateIcon = (isEnabled) => {
    icon.setAttribute(
        'src',
        isEnabled ? '../assets/power-off.png' : '../assets/power-on.png'
    );
};

/**
 * Updates userPreferences key in storage.local. In order to emit a storage.onChanged event, storage is cleared first.
 * @param {boolean} newSettings
 */
const updatePreferences = async (newSettings) => {
    await browser.storage.local.clear();
    Object.keys(userPreferences).map(
        (key) => (userPreferences[key] = newSettings)
    );
    await browser.storage.local.set({ userPreferences });
};

icon.addEventListener('click', async () => {
    updatePreferences(!userPreferences.enable);
    updateIcon(!userPreferences.enable);
});
