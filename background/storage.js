browser.runtime.onInstalled.addListener(async () => {
    let userPreferences = {
        enable: true,
        postgame_rating: true,
        postgame_chat_gameover: true,
        postgame_chat_vote: true,
    };
    await browser.storage.local.set({ userPreferences });
});
