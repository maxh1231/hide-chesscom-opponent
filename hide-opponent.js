let hide;
browser.storage.local.get('userPreferences').then((data) => {
    hide = data.userPreferences;
});

const gameoverObserver = new MutationObserver((mutation) => {
    // console.log('gameover observer', mutation);
})
gameoverObserver.observe(document.querySelector('div.player-tagline'), { childList: true })


const avatarAndGrudgeObserver = new MutationObserver((mutation) => {
    // console.log('avatar/grudge observer', mutation);
})
avatarAndGrudgeObserver.observe(document.querySelector('div.player-component.player-top'), { childList: true })

const oppTagline = document.querySelector('div.user-tagline-component');

const oppTaglinObserver = new MutationObserver((mutation) => {
    // console.log('tagline observer', mutation);

    if (hide.badge) hideElement(oppTagline.querySelector('a.mvp-badge-component'))
    if (hide.flag) hideElement(oppTagline.querySelector('div.country-flags-component'));
    if (hide.flair) hideElement(oppTagline.querySelector('img.flair-rpc-component'));
    if (hide.rating) hideElement(oppTagline.querySelector('span.user-tagline-rating'));
    if (hide.username) hideElement(oppTagline.querySelector('a.user-username-component'));
});
oppTaglinObserver.observe(oppTagline, { childList: true });

const hideElement = (element) => {
    if (element) element.style.display = 'none'
}

const hideAvatar = () => {
    let oppImage = playerTop.querySelector('div.player-avatar-component > img');
    if (oppImage) oppImage.setAttribute('src', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif');
}



// console.log(browser.storage.local.get('userPreferences'))

// const hideElements = () => {

//     let newGameMsg = document.querySelector('div.game-start-message-component');
//     if (newGameMsg) newGameMsg.style.display = 'none';

//     let rateOppMsg = document.querySelector('div.game-rate-sport-message-component');
//     if (rateOppMsg) rateOppMsg.style.display = 'none';
// }


