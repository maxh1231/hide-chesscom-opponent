browser.webNavigation.onHistoryStateUpdated.addListener(
    (e) => {
        browser.tabs.sendMessage(e.tabId, { event: 'url' });
    },
    { url: [{ urlMatches: 'https://www.chess.com/game/*' }] }
);

browser.storage.onChanged.addListener(async () => {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url.includes('chess.com')) {
        browser.tabs.sendMessage(tab.id, { event: 'storage' });
    }
});
