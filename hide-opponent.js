
const observer = new MutationObserver(() => {
    hideElements();
});

observer.observe(document.body, { childList: true, subtree: true });

const hideElements = () => {
    let parent = document.querySelector('div.player-component.player-top');

    let oppImage = parent.querySelector('div.player-avatar-component > img');
    if (oppImage) oppImage.setAttribute('src', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif');

    let userTagline = parent.querySelector('div.player-tagline > div.user-tagline-component')
    let oppName = userTagline.querySelector('a.user-username-component');
    let oppBadge = userTagline.querySelector('a.mvp-badge-component');
    let oppTitle = userTagline.querySelector('a.user-chess-title-component');
    let oppRating = userTagline.querySelector('span.user-tagline-rating');
    let oppFlag = userTagline.querySelector('div.country-flags-component');
    let oppFlair = userTagline.querySelector('img.flair-rpc-component');

    if (oppName) oppName.style.display = 'none';
    if (oppBadge) oppBadge.style.display = 'none';
    if (oppTitle) oppTitle.style.display = 'none';
    if (oppRating) oppRating.style.display = 'none';
    if (oppFlag) oppFlag.style.display = 'none';
    if (oppFlair) oppFlair.style.display = 'none';

    // let newGameText = newGameMsgParent.firstChild;

    let newGameMsg = document.querySelector('div.game-start-message-component');
    if (newGameMsg) newGameMsg.style.display = 'none';

    let rateOppMsg = document.querySelector('div.game-rate-sport-message-component');
    if (rateOppMsg) rateOppMsg.style.display = 'none';
}


