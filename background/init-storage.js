browser.runtime.onInstalled.addListener(() => {
    let userPreferences = {
        enabled: true,
        postgame_rating: true,
        postgame_chat_gameover: true,
        postgame_chat_vote: true,
    };
    browser.storage.local.set({ userPreferences });
});
