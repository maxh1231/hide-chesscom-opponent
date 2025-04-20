browser.webNavigation.onHistoryStateUpdated.addListener(
    (e) => {
        browser.tabs.sendMessage(e.tabId, { action: 'hello' });
    },
    { url: [{ urlMatches: 'https://www.chess.com/game/*' }] }
);
