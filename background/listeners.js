const stylesheets = [
    'assets/stylesheets/base.css',
    'assets/stylesheets/postgame-rating.css',
    'assets/stylesheets/postgame-chat-gameover.css',
    'assets/stylesheets/postgame-chat-vote.css',
];

/**
 * Obtains User's preferences and builds an array of associated associated stylesheets.
 * Returns null if extension is disbaled.
 * @returns {string[] | null}
 */
const evalPreferences = async () => {
    const { userPreferences } =
        await browser.storage.local.get('userPreferences');
    if (!userPreferences.enable) return null;
    let arr = [];
    Object.values(userPreferences).map((pref, i) => {
        if (pref) arr.push(stylesheets[i]);
    });

    return arr;
};

/**
 * Inserts or removes stylesheets.
 * @param {string[]} sheets CSS to insert
 * @param {number} tabId tab to insertCSS
 * @param {'insert' | 'remove'} action to perform
 */
const applyCSS = (sheets, tabId, action) => {
    console.log(sheets, tabId, action);
    browser.scripting[`${action}CSS`]({
        target: {
            tabId: tabId,
        },
        files: sheets,
    });
};

browser.webNavigation.onHistoryStateUpdated.addListener(
    async (e) => {
        const preferences = await evalPreferences();
        if (preferences) applyCSS(preferences, e.tabId, 'insert');
    },
    { url: [{ urlMatches: 'https://www.chess.com/game/*' }] }
);

browser.storage.onChanged.addListener(async () => {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab.url || !tab.url.startsWith('https://www.chess.com/game')) return;
    applyCSS(stylesheets, tab.id, 'remove');

    const preferences = await evalPreferences();
    if (preferences) applyCSS(preferences, tab.id, 'insert');
});
