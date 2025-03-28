
let hide;
browser.storage.local.get('userPreferences').then((data) => {
    hide = data.userPreferences;
});

const playerTop = document.querySelector('div.player-component.player-top');

const playerTopObserver = new MutationObserver(() => {
    console.log(hide);

    if (hide.avatar) hideAvatar();
    if (hide.badge) hideBadge();
    if (hide.flag) hideFlag();
    if (hide.flair) hideFlair();
    if (hide.rating) hideRating();
    if (hide.username) hideUsername();
});
playerTopObserver.observe(playerTop, { childList: true, subtree: true });

const hideAvatar = () => {
    let oppImage = playerTop.querySelector('div.player-avatar-component > img');
    oppImage.setAttribute('src', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif');
}

const hideBadge = () => {
    let oppBadge = playerTop.querySelector('div.player-tagline > div.user-tagline-component > a.mvp-badge-component');
    oppBadge.style.display = 'none';
}

const hideFlag = () => {
    let oppFlag = playerTop.querySelector('div.player-tagline > div.user-tagline-component > div.country-flags-component');
    oppFlag.style.display = 'none'
}

const hideFlair = () => {
    let oppFlair = playerTop.querySelector('div.player-tagline > div.user-tagline-component > img.flair-rpc-component');
    oppFlair.style.display = 'none';
}

const hideRating = () => {
    let oppRating = playerTop.querySelector('div.player-tagline > div.user-tagline-component > span.user-tagline-rating');
    oppRating.style.display = 'none'
}

const hidePostgameRating = () => {

}

const hideUsername = () => {
    let oppUsername = playerTop.querySelector('div.player-tagline > div.user-tagline-component > a.user-username-component');
    oppUsername.style.display = 'none';
}

const hidePostgameUsername = () => {

}



// console.log(browser.storage.local.get('userPreferences'))

// const hideElements = () => {
//     let parent = document.querySelector('div.player-component.player-top');

//     let oppImage = parent.querySelector('div.player-avatar-component > img');
//     if (oppImage) oppImage.setAttribute('src', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif');

//     let userTagline = parent.querySelector('div.player-tagline > div.user-tagline-component')
//     let oppName = userTagline.querySelector('a.user-username-component');
//     let oppBadge = userTagline.querySelector('a.mvp-badge-component');
//     let oppTitle = userTagline.querySelector('a.user-chess-title-component');
//     let oppRating = userTagline.querySelector('span.user-tagline-rating');
//     let oppFlag = userTagline.querySelector('div.country-flags-component');
//     let oppFlair = userTagline.querySelector('img.flair-rpc-component');

//     if (oppName) oppName.style.display = 'none';
//     if (oppBadge) oppBadge.style.display = 'none';
//     if (oppTitle) oppTitle.style.display = 'none';
//     if (oppRating) oppRating.style.display = 'none';
//     if (oppFlag) oppFlag.style.display = 'none';
//     if (oppFlair) oppFlair.style.display = 'none';

//     let newGameMsg = document.querySelector('div.game-start-message-component');
//     if (newGameMsg) newGameMsg.style.display = 'none';

//     let rateOppMsg = document.querySelector('div.game-rate-sport-message-component');
//     if (rateOppMsg) rateOppMsg.style.display = 'none';
// }


