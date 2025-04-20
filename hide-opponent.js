browser.runtime.onMessage.addListener(() => {
    console.log('hit');
    document.querySelector('div.user-tagline-component').style.display = 'none';
    document
        .querySelector('div.player-avatar-component > img')
        .setAttribute(
            'src',
            'https://www.chess.com/bundles/web/images/noavatar_l.84a92436@3x.gif'
        );

    document.querySelector('div.game-start-message-component').style.display =
        'none';

    const playerTagline = document.querySelector('div.player-tagline');
    const playerTaglineObserver = new MutationObserver(() => {
        try {
            playerTagline.querySelector(
                'div.player-game-over-component'
            ).style.display = 'none';
        } catch (err) {
            console.error(err);
        }
    });
    playerTaglineObserver.observe(playerTagline, { childList: true });

    // const chatRoom = document.querySelector('div.chat-room-chat');
    // const chatRoomObserver = new MutationObserver(() => {
    //     try {
    //         chatRoom.querySelector(
    //             'div.game-over-message-component'
    //         ).style.display = 'none';
    //         chatRoom.querySelector(
    //             'div.game-rate-sport-message-component'
    //         ).style.display = 'none';
    //     } catch (err) {
    //         console.error(err);
    //     }
    // });
    // chatRoomObserver.observe(chatRoom, { childList: true });
});
