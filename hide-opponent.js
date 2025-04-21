const hideOrModifyElement = (element, isAvatar = false) => {
    if (element && isAvatar)
        element.setAttribute(
            'src',
            'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif'
        );
    else if (element) element.style.display = 'none';
};

browser.runtime.onMessage.addListener(() => {
    hideOrModifyElement(document.querySelector('div.user-tagline-component'));
    hideOrModifyElement(
        document.querySelector('div.player-avatar-component > img'),
        true
    );
    document
        .querySelectorAll('div.game-start-message-component')
        .forEach((el) => {
            hideOrModifyElement(el);
        });

    const playerTagline = document.querySelector('div.player-tagline');
    const playerTaglineObserver = new MutationObserver(() => {
        try {
            hideOrModifyElement(
                playerTagline.querySelector('div.player-game-over-component')
            );
        } catch (err) {
            console.error(err);
        }
    });
    playerTaglineObserver.observe(playerTagline, { childList: true });

    const chatRoom = document.querySelector('div.chat-room-chat');
    const chatRoomObserver = new MutationObserver(() => {
        try {
            document
                .querySelectorAll('div.game-over-message-component')
                .forEach((el) => {
                    hideOrModifyElement(el);
                });
        } catch (err) {
            console.error(err);
        }

        try {
            document
                .querySelectorAll('div.game-rate-sport-message-component')
                .forEach((el) => {
                    hideOrModifyElement(el);
                });
        } catch (err) {
            console.error(err);
        }
    });
    chatRoomObserver.observe(chatRoom, { childList: true });
});
