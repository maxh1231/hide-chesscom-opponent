browser.runtime.onInstalled.addListener(() => {
    let userPreferences = {
        avatar: true,
        badge: true,
        flag: true,
        flair: true,
        rating: true,
        rating_postgame: false,
        username: true,
        username_postgame: false
    };
    browser.storage.local.set({ userPreferences })
})