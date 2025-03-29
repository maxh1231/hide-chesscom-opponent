let hide;
browser.storage.local.get('userPreferences').then((data) => {
    hide = data.userPreferences;
});

const hideElement = (element, isAvatar = false) => {
    if (element && !isAvatar) element.style.display = 'none';
    else if (element && isAvatar) element.setAttribute('src', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif');
}

/**
 * Observes the creation/deletion of direct child elements of div.player-component.player-top
 * Hides Grudge Score & Avatar
 */
const playerTop = document.querySelector('div.player-component.player-top');
const playerTopObserver = new MutationObserver(() => {
    if (hide.avatar) hideElement(playerTop.querySelector('div.player-avatar-component > img'), true);
    if (hide.grudge) hideElement(playerTop.querySelector('div.grudge-score-component'));
})
playerTopObserver.observe(playerTop, { childList: true });

/**
 * Observes the creation/deletion of direct child elements of div.user-tagline-component
 * Hides Badge, Flag, Flair, Rating, Title, Username
 */
const userTaglineComponent = document.querySelector('div.user-tagline-component');
const userTaglineComponentObserver = new MutationObserver(() => {
    if (hide.badge) hideElement(userTaglineComponent.querySelector('a.mvp-badge-component'));
    if (hide.flag) hideElement(userTaglineComponent.querySelector('div.country-flags-component'));
    if (hide.flair) hideElement(userTaglineComponent.querySelector('img.flair-rpc-component'));
    if (hide.rating) hideElement(userTaglineComponent.querySelector('span.user-tagline-rating'));
    if (hide.title) hideElement(userTaglineComponent.querySelector('a.user-chess-title-component'));
    if (hide.username) hideElement(userTaglineComponent.querySelector('a.user-username-component'));
});
userTaglineComponentObserver.observe(userTaglineComponent, { childList: true });

/**
 * Observes the creation/deletion of direct child elements of div.player-tagline
 * Hides Rating in post-game 
 */
const playerTagline = document.querySelector('div.player-tagline');
const playerTaglineObserver = new MutationObserver(() => {
    if (hide.rating_postgame) hideElement(playerTagline.querySelector('div.player-game-over-component > span.rating-score-rating'));
})
playerTaglineObserver.observe(playerTagline, { childList: true });

/**
 * Observes the creation/deletion of direct child elements of div.chat-room-chat
 * Hides Username in game-start message
 * Hides Username in post-game
 * NOTE: STILL MUST HIDE/ALTER GAME OVER MESSAGE
 */
console.log('sidebar parent:', document.querySelector('div#board-layout-sidebar'));
console.log('sidebar child:', document.querySelector('div.sidebar-component'));
console.log('grandparent:', document.querySelector('div.resizable-chat-area-component.resizable-chat-area-resizable'));
console.log('parent:', document.querySelector('div.resizable-chat-area-content'));
console.log('chat:', document.querySelector('div.chat-room-chat'));
// console.log(chatRoom)
// const chatRoomObserver = new MutationObserver(() => {
//     if (hide.username) hideElement(chatRoom.querySelector('div.game-start-message-component'));
//     if (hide.username_postgame) hideElement(chatRoom.querySelector('div.game-rate-sport-message-component'));
// })
// chatRoomObserver.observe(chatRoom, { childList: true });