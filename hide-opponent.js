browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    initHide();
});

const initHide = () => {
    let hide;
    browser.storage.local.get('userPreferences').then((data) => {
        hide = data.userPreferences;
        console.log(hide);
    });

    const hideElement = (element = false) => {
        if (element) element.style.display = 'none';
    };

    /**
     * Observes the creation/deletion of direct child elements of div.player-component.player-top
     * Hides Grudge Score & Avatar
     */
    const playerTop = document.querySelector('div.player-component.player-top');
    const playerTopObserver = new MutationObserver(() => {
        if (hide.avatar)
            hideElement(
                playerTop.querySelector('div.player-avatar-component > img'),
                true
            );
        if (hide.grudge)
            hideElement(playerTop.querySelector('div.grudge-score-component'));
    });
    playerTopObserver.observe(playerTop, { childList: true });

    /**
     * Observes the creation/deletion of direct child elements of div.user-tagline-component
     * Hides Badge, Flag, Flair, Rating, Title, Username
     */
    const userTaglineComponent = document.querySelector(
        'div.user-tagline-component'
    );
    const userTaglineComponentObserver = new MutationObserver(() => {
        if (hide.badge)
            hideElement(
                userTaglineComponent.querySelector('a.mvp-badge-component')
            );
        if (hide.flag)
            hideElement(
                userTaglineComponent.querySelector(
                    'div.country-flags-component'
                )
            );
        if (hide.flair)
            hideElement(
                userTaglineComponent.querySelector('img.flair-rpc-component')
            );
        if (hide.rating)
            hideElement(
                userTaglineComponent.querySelector('span.user-tagline-rating')
            );
        if (hide.title)
            hideElement(
                userTaglineComponent.querySelector(
                    'a.user-chess-title-component'
                )
            );
        if (hide.username)
            hideElement(
                userTaglineComponent.querySelector('a.user-username-component')
            );
    });
    userTaglineComponentObserver.observe(userTaglineComponent, {
        childList: true,
    });

    /**
     * Observes the creation/deletion of direct child elements of div.player-tagline
     * Hides Rating in post-game
     */
    const playerTagline = document.querySelector('div.player-tagline');
    const playerTaglineObserver = new MutationObserver(() => {
        if (hide.rating_postgame)
            hideElement(
                playerTagline.querySelector(
                    'div.player-game-over-component > span.rating-score-rating'
                )
            );
    });
    playerTaglineObserver.observe(playerTagline, { childList: true });
};
